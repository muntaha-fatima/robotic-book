import os
import sys
import traceback
from dotenv import load_dotenv
load_dotenv()

print("Loading dependencies...")
try:
    import cohere
    print("✓ Cohere imported")
    
    from qdrant_client import QdrantClient, models
    print("✓ QdrantClient imported")
    
    from fastapi import FastAPI, HTTPException, Depends
    print("✓ FastAPI imported")
    
    from fastapi.middleware.cors import CORSMiddleware
    print("✓ CORSMiddleware imported")
    
    from auth import get_current_user
    print("✓ auth module imported")
    
    from utils import get_cohere_embedder
    print("✓ utils module imported")
    
    from models import RagQueryRequest
    print("✓ models module imported")
    
    print("✓ All dependencies loaded successfully")
    
except Exception as e:
    print(f"✗ Dependency loading failed: {e}")
    traceback.print_exc()
    sys.exit(1)

# Create app
app = FastAPI()

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test_chat")
async def test_chat_endpoint(request: RagQueryRequest, current_user: dict = Depends(get_current_user)):
    try:
        print(f"Chat endpoint called with query: {request.query}")
        
        # Test Cohere API directly
        cohere_api_key = os.getenv("COHERE_API_KEY")
        cohere_client = cohere.Client(cohere_api_key)
        
        # Simple test without RAG
        response = cohere_client.chat(
            message=request.query,
            max_tokens=50,
            temperature=0.7
        )
        
        return {
            "query": request.query,
            "response": response.text
        }
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

print("App created, starting server...")
try:
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug")
except Exception as e:
    print(f"Failed to start server: {e}")
    traceback.print_exc()