"""
Test script to verify the new RAGChat functionality with URL processing
"""
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

# Configuration
BASE_URL = "http://localhost:8002"  # Updated port

def test_new_endpoints():
    print("Testing New RAGChat Endpoints")
    print("="*50)

    # Note: You'll need to replace these with your actual JWT token after signup/login
    jwt_token = os.getenv("TEST_JWT_TOKEN", "YOUR_JWT_TOKEN_HERE")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {jwt_token}"
    }

    print("\nNew Endpoints Available:")
    
    print("\n1. Load documents from URL:")
    print(f"POST {BASE_URL}/documents/load-from-url")
    print("Example payload:")
    example_url_payload = {
        "url": "https://example.com/document.html",
        "chunk_size": 500,
        "chunk_overlap": 50
    }
    print(json.dumps(example_url_payload, indent=2))

    print("\n2. Upsert documents with metadata:")
    print(f"POST {BASE_URL}/documents/upsert")
    print("Example payload:")
    example_doc_payload = {
        "content": "Your document content here...",
        "source_type": "document",  # "document", "url", "text"
        "source_url": "https://example.com/source",
        "chunk_size": 500,
        "chunk_overlap": 50
    }
    print(json.dumps(example_doc_payload, indent=2))
    
    print(f"\n3. Enhanced RAG query with metadata support:")
    print(f"POST {BASE_URL}/rag/query")
    print("Returns sources with metadata")
    
    print(f"\n4. Enhanced chat with metadata support:")
    print(f"POST {BASE_URL}/chat")
    print("Returns sources with metadata")

    print("\n" + "="*50)
    print("To use these endpoints:")
    print("1. First sign up a user: POST /signup")
    print("2. Log in to get JWT token: POST /login") 
    print("3. Use JWT token in Authorization header for new endpoints")
    print("="*50)

if __name__ == "__main__":
    test_new_endpoints()