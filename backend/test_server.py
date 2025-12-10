import os
import subprocess
import time
import requests
import signal
import sys

# Function to start the server in the background
def start_server():
    print("Starting backend server...")
    process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(3)  # Wait for server to start
    return process

# Function to test the server
def test_server():
    try:
        # Test if server is running
        response = requests.get("http://127.0.0.1:8000/")
        print(f"Server status: {response.status_code}")
        print(f"Server response: {response.json()}")
        return True
    except requests.exceptions.ConnectionError:
        print("Failed to connect to server")
        return False

# Function to test sign up
def test_signup():
    try:
        response = requests.post("http://127.0.0.1:8000/signup", json={
            "username": "testuser",
            "password": "testpassword123"
        })
        print(f"Signup status: {response.status_code}")
        print(f"Signup response: {response.json()}")
        return True
    except Exception as e:
        print(f"Signup failed: {e}")
        return False

# Function to test login
def test_login():
    try:
        response = requests.post("http://127.0.0.1:8000/login", json={
            "username": "testuser",
            "password": "testpassword123"
        })
        print(f"Login status: {response.status_code}")
        if response.status_code == 200:
            print(f"Login response: {response.json()}")
            return True, response.json().get('access_token')
        else:
            print(f"Login response: {response.text}")
            return False, None
    except Exception as e:
        print(f"Login failed: {e}")
        return False, None

# Function to test protected route
def test_protected_route(token):
    try:
        if not token:
            print("No token to test protected route")
            return False

        response = requests.get("http://127.0.0.1:8000/users/me", headers={
            "Authorization": f"Bearer {token}"
        })
        print(f"Protected route status: {response.status_code}")
        print(f"Protected route response: {response.json()}")
        return True
    except Exception as e:
        print(f"Protected route failed: {e}")
        return False

def main():
    # Start the server
    server_process = start_server()
    
    # Check if server started successfully
    if not test_server():
        print("Server failed to start properly")
        server_process.terminate()
        return
    
    print("Server is running successfully!")
    
    # Test sign up
    print("\nTesting sign up...")
    test_signup()
    
    # Test login
    print("\nTesting login...")
    login_success, token = test_login()
    
    # Test protected route if login was successful
    if login_success and token:
        print("\nTesting protected route...")
        test_protected_route(token)
    else:
        print("\nSkipping protected route test - login failed")
    
    # Terminate the server
    print("\nStopping server...")
    server_process.terminate()

if __name__ == "__main__":
    main()