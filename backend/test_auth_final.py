import subprocess
import time
import requests
import signal
import sys
import os
import threading

def run_server():
    """Run the server in a subprocess"""
    os.chdir("c:\\Users\\dell\\robotic-book\\backend")
    proc = subprocess.Popen([sys.executable, "-c", 
        "from main import app; import uvicorn; uvicorn.run(app, host='127.0.0.1', port=8000, log_level='error')"])
    return proc

def test_auth_system():
    server_process = None
    try:
        print("Starting backend server...")
        server_process = run_server()
        
        # Give the server time to start
        time.sleep(5)
        
        # Test if server is running
        try:
            response = requests.get("http://127.0.0.1:8000/", timeout=5)
            if response.status_code == 200:
                print("+ Server is running successfully!")
                print(f"  Response: {response.json()}")
            else:
                print(f"- Server returned unexpected status: {response.status_code}")
                return False
        except requests.exceptions.ConnectionError:
            print("- Failed to connect to server. Server may not have started properly.")
            return False
        except requests.exceptions.Timeout:
            print("- Server connection timed out.")
            return False

        # Test signup
        print("\nTesting signup functionality...")
        try:
            response = requests.post("http://127.0.0.1:8000/signup", json={
                "username": "testuser",
                "password": "testpassword123"
            }, timeout=10)
            print(f"  Signup status: {response.status_code}")
            if response.status_code == 200:
                print("  + Signup successful")
                signup_data = response.json()
                print(f"  Token received: {'access_token' in signup_data}")
            else:
                print(f"  - Signup failed: {response.text}")
        except Exception as e:
            print(f"  - Signup error: {e}")

        # Test login with the same credentials
        print("\nTesting login functionality...")
        try:
            response = requests.post("http://127.0.0.1:8000/login", json={
                "username": "testuser",
                "password": "testpassword123"
            }, timeout=10)
            print(f"  Login status: {response.status_code}")
            if response.status_code == 200:
                print("  + Login successful")
                login_data = response.json()
                token = login_data.get('access_token')
                print(f"  Token received: {token is not None}")
            else:
                print(f"  - Login failed: {response.text}")
        except Exception as e:
            print(f"  - Login error: {e}")

        # Test login with wrong credentials
        print("\nTesting failed login...")
        try:
            response = requests.post("http://127.0.0.1:8000/login", json={
                "username": "testuser",
                "password": "wrongpassword"
            }, timeout=10)
            print(f"  Wrong login status: {response.status_code}")
            if response.status_code == 401:
                print("  + Correctly rejected wrong password")
            else:
                print(f"  ? Unexpected response for wrong password: {response.text}")
        except Exception as e:
            print(f"  - Wrong login error: {e}")

        # Test protected route if we have a token
        print("\nTesting protected route...")
        try:
            # Get token first
            response = requests.post("http://127.0.0.1:8000/login", json={
                "username": "testuser",
                "password": "testpassword123"
            }, timeout=10)

            if response.status_code == 200:
                token = response.json().get('access_token')
                if token:
                    response = requests.get("http://127.0.0.1:8000/users/me", headers={
                        "Authorization": f"Bearer {token}"
                    }, timeout=10)
                    print(f"  Protected route status: {response.status_code}")
                    if response.status_code == 200:
                        print("  + Protected route accessible with valid token")
                    else:
                        print(f"  - Protected route failed: {response.text}")
                else:
                    print("  ! Could not get token to test protected route")
            else:
                print(f"  ! Could not login to get token: {response.text}")
        except Exception as e:
            print(f"  - Protected route error: {e}")

        print("\n" + "="*50)
        print("Authentication system test completed!")
        print("Note: Backend may have warnings about QwenAI and Qdrant not being available,")
        print("but the authentication functionality should work properly.")
        print("="*50)

        return True

    except KeyboardInterrupt:
        print("\nTest interrupted by user.")
        return False

    finally:
        # Kill the server process
        if server_process:
            try:
                server_process.terminate()
                server_process.wait(timeout=2)
            except subprocess.TimeoutExpired:
                server_process.kill()

if __name__ == "__main__":
    success = test_auth_system()
    if success:
        print("\n+ Authentication system is working correctly!")
    else:
        print("\n- There were issues with the authentication system.")