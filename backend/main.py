import os
import cohere
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import QdrantClient, models
from dotenv import load_dotenv
from auth import signup_user, login_user, get_current_user
from database import get_db_connection
from utils import get_cohere_embedder
from models import SignUpRequest, LoginRequest, UpsertRequest, RagQueryRequest, RagResponse, Source, URLUpsertRequest, DocumentUpsertRequest
from document_loaders import DocumentLoader

load_dotenv()

app = FastAPI()

# Add CORS middleware - this is essential for frontend communication
# For development with React frontend on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server
        "http://localhost:3001",  # React development server
        "http://localhost:8001",  # Backend itself
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
        # Add your production domain here in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose the authorization header so frontend can read it
    expose_headers=["Access-Control-Allow-Origin"]
)

# Call to create database tables on startup
@app.on_event("startup")
async def startup_event():
    from database import create_users_table
    print("Initializing database tables...")
    create_users_table()
    print("Database initialization complete.")

# --- Clients ---
def initialize_clients():
    global qdrant_client
    qdrant_client = None

    # Load environment variables explicitly
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")
    cohere_api_key = os.getenv("COHERE_API_KEY")
    neon_db_url = os.getenv("NEON_DB_URL")

    print(f"QDRANT_URL loaded: {'Yes' if qdrant_url else 'No'}")
    print(f"QDRANT_API_KEY loaded: {'Yes' if qdrant_api_key else 'No'}")
    print(f"COHERE_API_KEY loaded: {'Yes' if cohere_api_key else 'No'}")
    print(f"NEON_DB_URL loaded: {'Yes' if neon_db_url else 'No'}")

    # Initialize Qdrant client with error handling
    try:
        if qdrant_url and qdrant_api_key:
            # Try to connect with additional parameters that might help with Cloud setup
            qdrant_client = QdrantClient(
                url=qdrant_url,
                api_key=qdrant_api_key,
                # Add timeout and verify SSL for better connection handling
                timeout=10,
            )
            print("Successfully connected to Qdrant")
        else:
            print("ERROR: Missing QDRANT_URL or QDRANT_API_KEY in environment variables")
            qdrant_client = None
    except Exception as e:
        print(f"Error connecting to Qdrant: {e}")
        qdrant_client = None

    # Initialize Qdrant collection
    if qdrant_client:
        collection_name = "robotic-chat"
        try:
            # Check if collection exists first
            try:
                collection_info = qdrant_client.get_collection(collection_name=collection_name)
                print("Qdrant collection already exists, skipping creation")
            except Exception as get_error:
                print(f"Collection doesn't exist or can't be accessed: {get_error}")
                # If collection doesn't exist, try to create it
                try:
                    # Test Cohere to get embedding size
                    embedder = get_cohere_embedder()
                    test_embedding = embedder.embed_text("test", input_type="search_document")
                    embedding_size = len(test_embedding)

                    qdrant_client.create_collection(
                        collection_name=collection_name,
                        vectors_config=models.VectorParams(size=embedding_size, distance=models.Distance.COSINE),
                    )
                    print("Qdrant collection created successfully")
                except Exception as create_error:
                    print(f"Could not create collection: {create_error}")
                    print("Note: The system will continue but may have issues with vector storage.")
        except Exception as e:
            print(f"Error initializing Qdrant collection: {e}")
            print("Note: This may be due to insufficient permissions. The system will continue but may have issues with vector storage.")

    return qdrant_client is not None

# Initialize clients
initialize_clients()

# --- Endpoints ---
@app.get("/")
async def root():
    return {"message": "Welcome to the Robotics Book API"}

@app.post("/signup", tags=["auth"])
async def signup(user: SignUpRequest):
    try:
        # Validate input
        if not user.username or not user.password:
            raise HTTPException(status_code=400, detail="Username and password are required")

        if len(user.username) < 3:
            raise HTTPException(status_code=400, detail="Username must be at least 3 characters long")

        if len(user.password) < 8:
            raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

        # Check password byte length (for bcrypt 72-byte limit)
        password_bytes = user.password.encode('utf-8')
        if len(password_bytes) > 72:
            raise HTTPException(status_code=400, detail="Password cannot exceed 50 characters due to bcrypt limitations.")

        result = await signup_user(user.username, user.password)
        return result
    except HTTPException:
        # Re-raise HTTP exceptions as they are
        raise
    except Exception as e:
        # Log the error for debugging
        print(f"Signup error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Signup failed: {str(e)}")

@app.post("/login", tags=["auth"])
async def login(user: LoginRequest):
    try:
        result = await login_user(user.username, user.password)
        return result
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Login failed: {str(e)}")

@app.get("/users/me", tags=["auth"])
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.post("/embeddings/upsert")
async def upsert_embeddings(request: UpsertRequest, current_user: dict = Depends(get_current_user)):
    if not qdrant_client:
        raise HTTPException(status_code=500, detail="Qdrant client not initialized. Check your QDRANT_URL and QDRANT_API_KEY in .env file.")

    try:
        # Generate embedding using Cohere
        embedder = get_cohere_embedder()
        embedding = embedder.embed_text(request.text, input_type="search_document")

        collection_name = "robotics-book"
        qdrant_client.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id=abs(hash(request.text)) % (10**16),  # Ensure positive ID within range
                    vector=embedding,
                    payload={"text": request.text, "user": current_user['username']}
                )
            ],
            wait=True,
        )
        return {"status": "success"}
    except Exception as e:
        print(f"Embedding upsert error: {str(e)}")
        # Provide more specific error message based on the type of error
        error_msg = str(e)
        if "forbidden" in error_msg.lower() or "403" in error_msg:
            raise HTTPException(
                status_code=500,
                detail="Qdrant access forbidden. Please check your QDRANT_API_KEY permissions or collection access rights."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Failed to upsert embeddings: {str(e)}")

@app.post("/rag/query", response_model=RagResponse)
async def rag_query_endpoint(request: RagQueryRequest, current_user: dict = Depends(get_current_user)):
    if not qdrant_client:
        raise HTTPException(status_code=500, detail="Qdrant client not initialized. Check your QDRANT_URL and QDRANT_API_KEY in .env file.")

    collection_name = "robotics-book"
    try:
        # Generate query embedding using Cohere (using search_query input_type for queries)
        embedder = get_cohere_embedder()
        query_embedding = embedder.embed_query(request.query)

        # Perform vector search in Qdrant - handle different Qdrant client versions
        try:
            # Try the newer query_points method first (Qdrant 1.9.0+)
            search_results = qdrant_client.query_points(
                collection_name=collection_name,
                query=query_embedding,
                limit=3,
            )
            # Handle QueryResponse object if needed
            if hasattr(search_results, 'points'):
                search_results = search_results.points
        except (AttributeError, TypeError):
            # Fallback to search method for older Qdrant versions
            search_results = qdrant_client.search(
                collection_name=collection_name,
                query_vector=query_embedding,
                limit=3,
            )

        # Extract context from search results
        context = " ".join([result.payload["text"] for result in search_results])

        # Create source objects with metadata
        sources = [
            Source(
                text=result.payload["text"],
                score=result.score,
                metadata={k: v for k, v in result.payload.items() if k != "text"}
            ) for result in search_results
        ]

        # Return the context and search results for the RAG system
        return RagResponse(
            query=request.query,
            context=context,
            sources=sources
        )
    except Exception as e:
        print(f"RAG query error: {str(e)}")
        error_msg = str(e)
        if "forbidden" in error_msg.lower() or "403" in error_msg:
            raise HTTPException(
                status_code=500,
                detail="Qdrant access forbidden. Please check your QDRANT_API_KEY permissions or collection access rights."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Failed to process RAG query: {str(e)}")

# Add a chat endpoint that uses the RAG context to generate responses
class ChatRequest(RagQueryRequest):
    pass

@app.post("/chat")
async def chat_endpoint(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    if not qdrant_client:
        raise HTTPException(status_code=500, detail="Qdrant client not initialized. Check your QDRANT_URL and QDRANT_API_KEY in .env file.")

    cohere_api_key = os.getenv("COHERE_API_KEY")
    if not cohere_api_key:
        raise HTTPException(status_code=500, detail="Cohere client not initialized. Check your COHERE_API_KEY in .env file.")

    collection_name = "robotics-book"
    try:
        print(f"Chat endpoint called with query: {request.query[:50]}...")

        # Generate query embedding using Cohere (using search_query input_type for queries)
        embedder = get_cohere_embedder()
        query_embedding = embedder.embed_query(request.query)
        print(f"Query embedding generated, length: {len(query_embedding)}")

        # Perform vector search in Qdrant - handle different Qdrant client versions
        try:
            # Try the newer query_points method first (Qdrant 1.9.0+)
            search_results = qdrant_client.query_points(
                collection_name=collection_name,
                query=query_embedding,
                limit=3,
            )
            # Handle QueryResponse object if needed
            if hasattr(search_results, 'points'):
                search_results = search_results.points
        except (AttributeError, TypeError):
            # Fallback to search method for older Qdrant versions
            search_results = qdrant_client.search(
                collection_name=collection_name,
                query_vector=query_embedding,
                limit=3,
            )

        print(f"Qdrant search completed, found {len(search_results)} results")

        # Extract context from search results
        context = " ".join([result.payload["text"] for result in search_results])
        print(f"Context extracted, length: {len(context)}")

        # Generate response using Cohere's chat endpoint (updated API)
        cohere_client = cohere.Client(cohere_api_key)
        print("Cohere client created")

        # Create a message with the context and user query for the chat API
        message = f"Based on the following context, answer the user's question.\n\nContext:\n{context}\n\nQuestion:\n{request.query}"
        print(f"Message prepared for Cohere, length: {len(message)}")

        response = cohere_client.chat(
            message=message,
            max_tokens=500,
            temperature=0.7
        )
        print("Cohere API call completed")

        response_text = response.text
        print(f"Response received from Cohere, length: {len(response_text)}")

        return {
            "query": request.query,
            "response": response_text,
            "context": context,
            "sources": [
                {
                    "text": result.payload["text"],
                    "score": result.score,
                    "metadata": {k: v for k, v in result.payload.items() if k != "text"}
                } for result in search_results
            ]
        }
    except Exception as e:
        print(f"Chat error: {str(e)}")
        import traceback
        traceback.print_exc()
        error_msg = str(e)
        if "forbidden" in error_msg.lower() or "403" in error_msg:
            raise HTTPException(
                status_code=500,
                detail="Qdrant access forbidden. Please check your QDRANT_API_KEY permissions or collection access rights."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Failed to process chat query: {str(e)}")

@app.post("/documents/load-from-url", tags=["documents"])
async def load_documents_from_url(request: URLUpsertRequest, current_user: dict = Depends(get_current_user)):
    if not qdrant_client:
        raise HTTPException(status_code=500, detail="Qdrant client not initialized. Check your QDRANT_URL and QDRANT_API_KEY in .env file.")

    try:
        # Load content from URL
        content = DocumentLoader.load_from_url(request.url)

        # Chunk the content
        chunks = DocumentLoader.chunk_text(content, request.chunk_size, request.chunk_overlap)

        # Process each chunk and store in Qdrant
        embedder = get_cohere_embedder()
        processed_chunks = 0

        for i, chunk in enumerate(chunks):
            if chunk.strip():  # Only process non-empty chunks
                # Generate embedding using Cohere
                embedding = embedder.embed_text(chunk, input_type="search_document")

                collection_name = "robotics-book"
                try:
                    qdrant_client.upsert(
                        collection_name=collection_name,
                        points=[
                            models.PointStruct(
                                id=abs(hash(f"{request.url}_{i}_{chunk[:50]}")) % (10**16),  # Ensure unique ID
                                vector=embedding,
                                payload={
                                    "text": chunk,
                                    "user": current_user['username'],
                                    "source_url": request.url,
                                    "chunk_index": i
                                }
                            )
                        ],
                        wait=True,
                    )
                except Exception as e:
                    print(f"Error upserting chunk {i}: {str(e)}")
                    # Re-raise the exception to handle it properly
                    raise
                processed_chunks += 1

        return {
            "status": "success",
            "chunks_processed": processed_chunks,
            "url": request.url,
            "total_chunks": len(chunks)
        }
    except Exception as e:
        print(f"URL document loading error: {str(e)}")
        error_msg = str(e)
        if "forbidden" in error_msg.lower() or "403" in error_msg:
            raise HTTPException(
                status_code=500,
                detail="Qdrant access forbidden. Please check your QDRANT_API_KEY permissions or collection access rights."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Failed to load documents from URL: {str(e)}")


@app.post("/documents/upsert", tags=["documents"])
async def upsert_documents(request: DocumentUpsertRequest, current_user: dict = Depends(get_current_user)):
    if not qdrant_client:
        raise HTTPException(status_code=500, detail="Qdrant client not initialized. Check your QDRANT_URL and QDRANT_API_KEY in .env file.")

    try:
        # Chunk the content
        chunks = DocumentLoader.chunk_text(request.content, request.chunk_size, request.chunk_overlap)

        # Process each chunk and store in Qdrant
        embedder = get_cohere_embedder()
        processed_chunks = 0

        for i, chunk in enumerate(chunks):
            if chunk.strip():  # Only process non-empty chunks
                # Generate embedding using Cohere
                embedding = embedder.embed_text(chunk, input_type="search_document")

                collection_name = "robotics-book"
                try:
                    qdrant_client.upsert(
                        collection_name=collection_name,
                        points=[
                            models.PointStruct(
                                id=abs(hash(f"{request.source_url or 'text'}_{i}_{chunk[:50]}")) % (10**16),  # Ensure unique ID
                                vector=embedding,
                                payload={
                                    "text": chunk,
                                    "user": current_user['username'],
                                    "source_type": request.source_type,
                                    "source_url": request.source_url,
                                    "chunk_index": i
                                }
                            )
                        ],
                        wait=True,
                    )
                except Exception as e:
                    print(f"Error upserting chunk {i}: {str(e)}")
                    # Re-raise the exception to handle it properly
                    raise
                processed_chunks += 1

        return {
            "status": "success",
            "chunks_processed": processed_chunks,
            "source_type": request.source_type,
            "source_url": request.source_url,
            "total_chunks": len(chunks)
        }
    except Exception as e:
        print(f"Document upsert error: {str(e)}")
        error_msg = str(e)
        if "forbidden" in error_msg.lower() or "403" in error_msg:
            raise HTTPException(
                status_code=500,
                detail="Qdrant access forbidden. Please check your QDRANT_API_KEY permissions or collection access rights."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Failed to upsert documents: {str(e)}")


# Server startup
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)