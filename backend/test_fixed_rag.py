#!/usr/bin/env python3
"""
Test script for RAG endpoints after fixing the Qdrant API issue
"""
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

# Configuration
BASE_URL = "http://localhost:8000"

def test_rag_endpoints():
    print("Testing RAG Endpoints After Fix")
    print("="*50)

    # First, check if server is running
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("[OK] Server is running")
        else:
            print(f"[ERROR] Server returned status {response.status_code}")
            return
    except Exception as e:
        print(f"[ERROR] Cannot connect to server: {e}")
        print("Make sure to start the backend server with: python main.py")
        return

    # Test signup (we'll use a temporary user)
    print("\n1. Testing sign up...")
    signup_data = {
        "username": "testuser",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/signup", json=signup_data)
        if response.status_code == 200:
            print("[OK] Signup successful")
        else:
            print(f"[ERROR] Signup failed: {response.status_code}, {response.text}")
            # If user already exists, that's okay
            if "already exists" in response.text.lower():
                print("[INFO] User already exists (this is fine)")
    except Exception as e:
        print(f"[ERROR] Signup request failed: {e}")

    # Test login
    print("\n2. Testing login...")
    try:
        response = requests.post(f"{BASE_URL}/login", json=signup_data)
        if response.status_code == 200:
            token_data = response.json()
            jwt_token = token_data.get('access_token')
            if jwt_token:
                print("[OK] Login successful")
            else:
                print(f"[ERROR] No token in response: {token_data}")
                return
        else:
            print(f"[ERROR] Login failed: {response.status_code}, {response.text}")
            return
    except Exception as e:
        print(f"[ERROR] Login request failed: {e}")
        return

    # Test upsert embeddings (with authentication)
    print("\n3. Testing embeddings upsert...")
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    upsert_data = {
        "text": "ROS 2 is a flexible framework for robotics applications. It provides libraries and tools to help software developers create robot applications."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/embeddings/upsert", headers=headers, json=upsert_data)
        if response.status_code == 200:
            print("[OK] Embeddings upsert successful")
        else:
            print(f"[ERROR] Embeddings upsert failed: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"[ERROR] Embeddings upsert request failed: {e}")

    # Test rag query (with authentication)
    print("\n4. Testing RAG query...")
    query_data = {
        "query": "What is ROS 2?"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/rag/query", headers=headers, json=query_data)
        if response.status_code == 200:
            result = response.json()
            print(f"[OK] RAG query successful")
            print(f"   Query: {result.get('query', 'N/A')}")
            print(f"   Context length: {len(result.get('context', ''))} chars")
            print(f"   Sources found: {len(result.get('sources', []))}")
        else:
            print(f"[ERROR] RAG query failed: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"[ERROR] RAG query request failed: {e}")
        print("This is likely the original issue we're trying to fix.")

    # Test chat (with authentication)
    print("\n5. Testing chat endpoint...")
    try:
        response = requests.post(f"{BASE_URL}/chat", headers=headers, json=query_data)
        if response.status_code == 200:
            result = response.json()
            print(f"[OK] Chat endpoint successful")
            print(f"   Query: {result.get('query', 'N/A')}")
            print(f"   Response length: {len(result.get('response', ''))} chars")
            print(f"   Context length: {len(result.get('context', ''))} chars")
        else:
            print(f"[ERROR] Chat endpoint failed: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"[ERROR] Chat endpoint request failed: {e}")
        print("This is likely the original issue we're trying to fix.")

    print("\n" + "="*50)
    print("Test completed! Check results above.")
    print("If you still see errors, the Qdrant client version might need to be compatible with the method being used.")

if __name__ == "__main__":
    test_rag_endpoints()