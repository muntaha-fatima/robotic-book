"""
Test script for RAG functionality
This script tests the Cohere + Qdrant RAG system
"""
import os
import sys
import requests
import json
from dotenv import load_dotenv

load_dotenv()

# Load environment variables
BASE_URL = "http://localhost:8000"
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_DB_URL = os.getenv("NEON_DB_URL")

def test_environment():
    """Test that all environment variables are set"""
    print("Testing environment variables...")
    print(f"COHERE_API_KEY loaded: {'Yes' if COHERE_API_KEY else 'No'}")
    print(f"QDRANT_URL loaded: {'Yes' if QDRANT_URL else 'No'}")
    print(f"QDRANT_API_KEY loaded: {'Yes' if QDRANT_API_KEY else 'No'}")
    print(f"NEON_DB_URL loaded: {'Yes' if NEON_DB_URL else 'No'}")
    
    required_vars = [COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY, NEON_DB_URL]
    if not all(required_vars):
        print("ERROR: Missing one or more required environment variables!")
        return False
    return True

def test_server_connection():
    """Test connection to the backend server"""
    print("\nTesting server connection...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✓ Server connection successful")
            return True
        else:
            print(f"✗ Server returned status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Server connection failed: {e}")
        return False

def test_embedding_upsert():
    """Test embedding upsert functionality"""
    print("\nTesting embedding upsert...")
    try:
        # For this test, we'll need to register a user and get a token first
        # Or we could test without authentication by temporarily modifying the backend
        print("This test requires authentication. Please test manually with curl or Postman.")
        return True
    except Exception as e:
        print(f"✗ Embedding upsert test failed: {e}")
        return False

def print_curl_examples():
    """Print curl examples for testing"""
    print("\n" + "="*60)
    print("CURL EXAMPLES FOR TESTING:")
    print("="*60)
    
    print("\n1. Sign up a new user:")
    print("curl -X POST http://localhost:8000/signup \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -d '{\"username\": \"testuser\", \"password\": \"testpassword123\"}'")
    
    print("\n2. Log in:")
    print("curl -X POST http://localhost:8000/login \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -d '{\"username\": \"testuser\", \"password\": \"testpassword123\"}'")
    
    print("\n3. Upsert embeddings (replace TOKEN with actual JWT token):")
    print("curl -X POST http://localhost:8000/embeddings/upsert \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -H 'Authorization: Bearer TOKEN' \\")
    print("  -d '{\"text\": \"Artificial intelligence is a wonderful field that involves machine learning and neural networks.\"}'")
    
    print("\n4. Query RAG system (replace TOKEN with actual JWT token):")
    print("curl -X POST http://localhost:8000/rag/query \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -H 'Authorization: Bearer TOKEN' \\")
    print("  -d '{\"query\": \"What is artificial intelligence?\"}'")

def print_postman_examples():
    """Print Postman examples for testing"""
    print("\n" + "="*60)
    print("POSTMAN EXAMPLES FOR TESTING:")
    print("="*60)
    
    print("\n1. Sign up a new user:")
    print("POST http://localhost:8000/signup")
    print("Headers: Content-Type: application/json")
    print("Body: {\"username\": \"testuser\", \"password\": \"testpassword123\"}")
    
    print("\n2. Log in:")
    print("POST http://localhost:8000/login")
    print("Headers: Content-Type: application/json")
    print("Body: {\"username\": \"testuser\", \"password\": \"testpassword123\"}")
    
    print("\n3. Upsert embeddings:")
    print("POST http://localhost:8000/embeddings/upsert")
    print("Headers: Content-Type: application/json, Authorization: Bearer [TOKEN]")
    print("Body: {\"text\": \"Artificial intelligence is a wonderful field that involves machine learning and neural networks.\"}")
    
    print("\n4. Query RAG system:")
    print("POST http://localhost:8000/rag/query")
    print("Headers: Content-Type: application/json, Authorization: Bearer [TOKEN]")
    print("Body: {\"query\": \"What is artificial intelligence?\"}")

if __name__ == "__main__":
    print("RAG System Test Script")
    print("="*60)
    
    # Run tests
    env_ok = test_environment()
    if not env_ok:
        print("Environment test failed. Please set all required environment variables.")
        sys.exit(1)
    
    server_ok = test_server_connection()
    if not server_ok:
        print("Server connection test failed. Make sure the backend is running on port 8000.")
        sys.exit(1)
    
    test_embedding_upsert()
    
    print_curl_examples()
    print_postman_examples()
    
    print("\n" + "="*60)
    print("TEST SCRIPT COMPLETED")
    print("Make sure your backend is running with: python main.py")
    print("Then follow the curl/Postman examples to test the RAG functionality.")
    print("="*60)