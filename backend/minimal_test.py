import os
import cohere
from fastapi import FastAPI, HTTPException, Depends
from dotenv import load_dotenv
from auth import get_current_user  # Assuming this exists and works
from utils import get_cohere_embedder
from models import RagQueryRequest  # Assuming this exists
from qdrant_client import QdrantClient, models

load_dotenv()

app = FastAPI()

@app.post("/chat_test")
async def chat_endpoint_test(request: RagQueryRequest, current_user: dict = Depends(get_current_user)):
    print("Chat endpoint reached")
    
    cohere_api_key = os.getenv("COHERE_API_KEY")
    if not cohere_api_key:
        raise HTTPException(status_code=500, detail="Cohere API key not configured")

    try:
        print("Creating Cohere client")
        cohere_client = cohere.Client(cohere_api_key)
        print("Cohere client created")

        # Create a simple message (without RAG context for testing)
        message = f"Answer the following question: {request.query}"

        print("Calling Cohere chat API")
        response = cohere_client.chat(
            message=message,
            max_tokens=100,
            temperature=0.7
        )

        response_text = response.text
        print("Cohere API call successful")

        return {
            "query": request.query,
            "response": response_text
        }
    except Exception as e:
        print(f"Chat error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to process chat query: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)