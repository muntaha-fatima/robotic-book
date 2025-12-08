import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from qdrant_client import QdrantClient, models
import google.generativeai as genai
from dotenv import load_dotenv
from better_auth import BetterAuth
from better_auth.schemas import UserCreate, UserLogin
from database import get_db_connection
import psycopg2.extras

load_dotenv()

app = FastAPI()

# Call to create database tables on startup
@app.on_event("startup")
async def startup_event():
    create_users_table()

# --- Auth ---
auth = BetterAuth(
    secret_key=os.getenv("SECRET_KEY", "a_very_secret_key"),
    db_connection_url=os.getenv("NEON_DB_URL")
)

# --- Pydantic Models ---
class UpsertRequest(BaseModel):
    text: str
    
class QueryRequest(BaseModel):
    query: str

class TranslateRequest(BaseModel):
    text: str

class PersonalizeRequest(BaseModel):
    text: str

# --- Clients ---
try:
    qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"), 
        api_key=os.getenv("QDRANT_API_KEY")
    )
except Exception as e:
    print(f"Error connecting to Qdrant: {e}")
    qdrant_client = None

try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    gemini_client = genai.GenerativeModel("gemini-pro")
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    gemini_client = None

# --- Qdrant Collection ---
collection_name = "robotics-book"

if qdrant_client:
    try:
        qdrant_client.recreate_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE),
        )
    except Exception as e:
        print(f"Error creating Qdrant collection: {e}")

# --- Endpoints ---
@app.get("/")
async def root():
    return {"message": "Welcome to the Robotics Book API"}

@app.post("/signup", tags=["auth"])
async def signup(user: UserCreate):
    return auth.signup(user.username, user.password)

@app.post("/login", tags=["auth"])
async def login(user: UserLogin):
    return auth.login(user.username, user.password)

@app.get("/users/me", tags=["auth"])
async def read_users_me(current_user: dict = Depends(auth.get_current_active_user)):
    return current_user

@app.post("/embeddings/upsert")
async def upsert_embeddings(request: UpsertRequest, current_user: dict = Depends(auth.get_current_active_user)):
    if not gemini_client or not qdrant_client:
        raise HTTPException(status_code=500, detail="Backend clients not initialized")

    try:
        embedding_model = genai.get_model('embedding-001')
        embedding = embedding_model.embed_content(
            content=request.text,
            task_type="RETRIEVAL_DOCUMENT",
        )['embedding']

        qdrant_client.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id=hash(request.text), 
                    vector=embedding, 
                    payload={"text": request.text, "user": current_user['username']}
                )
            ],
            wait=True,
        )
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rag/query")
async def query_rag(request: QueryRequest, current_user: dict = Depends(auth.get_current_active_user)):
    if not gemini_client or not qdrant_client:
        raise HTTPException(status_code=500, detail="Backend clients not initialized")

    try:
        embedding_model = genai.get_model('embedding-001')
        query_embedding = embedding_model.embed_content(
            content=request.query,
            task_type="RETRIEVAL_QUERY"
        )['embedding']

        search_results = qdrant_client.search(
            collection_name=collection_name,
            query_vector=query_embedding,
            limit=3,
        )

        context = " ".join([result.payload["text"] for result in search_results])
        
        response = gemini_client.generate_content(
            [
                "You are a helpful assistant for a robotics book.",
                f"Based on the following context, answer the user\'s question.\n\nContext:\n{context}\n\nQuestion:\n{request.query}"
            ]
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate")
async def translate_chapter(request: TranslateRequest, current_user: dict = Depends(auth.get_current_active_user)):
    if not gemini_client:
        raise HTTPException(status_code=500, detail="Gemini client not initialized")
        
    try:
        response = gemini_client.generate_content(
            [
                "You are a helpful translation assistant.",
                f"Translate the following text to Urdu:\n\n{request.text}"
            ]
        )
        return {"translation": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/personalize")
async def personalize_chapter(request: PersonalizeRequest, current_user: dict = Depends(auth.get_current_active_user)):
    if not gemini_client:
        raise HTTPException(status_code=500, detail="Gemini client not initialized")

    try:
        # Fetch user profile from DB
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("SELECT profile FROM users WHERE username = %s", (current_user['username'],))
        user_profile = cur.fetchone()
        cur.close()
        conn.close()

        if not user_profile or not user_profile.get('profile'):
            raise HTTPException(status_code=404, detail="User profile not found or empty.")

        profile_str = ", ".join([f"{k}: {v}" for k, v in user_profile['profile'].items()])
        response = gemini_client.generate_content(
            [
                "You are a helpful personalization assistant.",
                f"Rewrite the following chapter based on the user's profile.\n\nUser Profile:\n{profile_str}\n\nChapter:\n{request.text}"
            ]
        )
        return {"personalized_text": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))