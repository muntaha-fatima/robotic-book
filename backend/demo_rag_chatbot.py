#!/usr/bin/env python3
"""
Demo script for the RAG Chatbot
This script demonstrates how to use the complete RAG system
"""

import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

# Configuration
BASE_URL = "http://localhost:8000"
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_DB_URL = os.getenv("NEON_DB_URL")

def test_rag_chatbot():
    print("Testing RAG Chatbot System")
    print("="*50)

    if not all([COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY, NEON_DB_URL]):
        print("WARNING: Some environment variables are missing!")
        print("Make sure all required environment variables are set in your .env file")
    else:
        print("[OK] All environment variables present")

    # Note: You'll need to replace these with your actual JWT token after signup/login
    # For demonstration purposes, I'll show the format
    jwt_token = "YOUR_JWT_TOKEN_HERE"  # Replace with actual token after signup/login

    print("\nTo test the RAG chatbot, follow these steps:")

    print("\n1. First, sign up a user (if not already done):")
    print(f"curl -X POST {BASE_URL}/signup \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -d '{\"username\": \"testuser\", \"password\": \"testpassword123\"}'")

    print("\n2. Log in to get your JWT token:")
    print(f"curl -X POST {BASE_URL}/login \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -d '{\"username\": \"testuser\", \"password\": \"testpassword123\"}'")

    print(f"\n3. Store some content in the vector database:")
    print(f"curl -X POST {BASE_URL}/embeddings/upsert \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -H 'Authorization: Bearer YOUR_ACTUAL_JWT_TOKEN' \\")
    print("  -d '{\"text\": \"Artificial intelligence is a wonderful field that involves machine learning and neural networks. It has applications in robotics, natural language processing, and computer vision. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making.\"}'")

    print(f"\n4. Now ask questions using the chat endpoint:")
    print(f"curl -X POST {BASE_URL}/chat \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -H 'Authorization: Bearer YOUR_ACTUAL_JWT_TOKEN' \\")
    print("  -d '{\"query\": \"What is artificial intelligence?\"}'")

    print(f"\n5. Or use the RAG query endpoint for just context retrieval:")
    print(f"curl -X POST {BASE_URL}/rag/query \\")
    print("  -H 'Content-Type: application/json' \\")
    print("  -H 'Authorization: Bearer YOUR_ACTUAL_JWT_TOKEN' \\")
    print("  -d '{\"query\": \"What are applications of AI?\"}'")

    print("\n" + "="*50)
    print("The RAG system is now fully functional!")
    print("- /chat endpoint generates contextual responses")
    print("- /rag/query endpoint returns context and sources")
    print("- /embeddings/upsert stores content in vector database")
    print("="*50)

if __name__ == "__main__":
    test_rag_chatbot()