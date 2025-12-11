import sys
import os
sys.path.append(os.getcwd())

from main import app
from fastapi.testclient import TestClient

# Create a test client to test the endpoints
client = TestClient(app)

print("Testing the API endpoints...")

# Test the root endpoint
response = client.get("/")
print(f"Root endpoint: {response.status_code}, {response.json()}")

# Test signup
signup_data = {"username": "testuser", "password": "testpassword123"}
response = client.post("/signup", json=signup_data)
print(f"Signup endpoint: {response.status_code}")

if response.status_code == 200:
    token_data = response.json()
    token = token_data.get('access_token')
    print(f"Signup successful, token: {token[:20]}..." if token else "No token returned")

    # Store the content in vector DB
    content = {
        "text": "Artificial intelligence is a wonderful field that involves machine learning and neural networks. It has applications in robotics, natural language processing, and computer vision."
    }
    
    if token:
        headers = {"Authorization": f"Bearer {token}"}
        response = client.post("/embeddings/upsert", json=content, headers=headers)
        print(f"Upsert endpoint: {response.status_code}, {response.json()}")
        
        # Test chat endpoint
        chat_data = {"query": "What is artificial intelligence?"}
        response = client.post("/chat", json=chat_data, headers=headers)
        print(f"Chat endpoint: {response.status_code}")
        if response.status_code == 200:
            print(f"Chat response: {response.json()}")
        else:
            print(f"Chat error: {response.text}")
else:
    print(f"Signup error: {response.text}")

print("Testing completed")