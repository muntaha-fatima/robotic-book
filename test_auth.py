"""
Authentication System Tests
Run these tests to verify the authentication system works correctly
"""
import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:8000"

def test_signup():
    """Test signup functionality with various password lengths"""
    print("Testing signup functionality...")
    
    # Test 1: Valid signup
    print("  1. Testing valid signup...")
    response = requests.post(f"{BASE_URL}/signup", json={
        "username": "testuser123",
        "password": "validpass123"
    })
    print(f"     Status: {response.status_code}")
    if response.status_code == 200:
        print("     ✓ Valid signup successful")
        token_data = response.json()
        auth_token = token_data.get("access_token")
    else:
        print(f"     ✗ Valid signup failed: {response.text}")
        return False
    
    # Test 2: Password too short
    print("  2. Testing password too short (< 8 chars)...")
    response = requests.post(f"{BASE_URL}/signup", json={
        "username": "testuser456",
        "password": "short"
    })
    if response.status_code == 400:
        print("     ✓ Correctly rejected short password")
    else:
        print(f"     ✗ Should have rejected short password: {response.status_code}")
        return False
    
    # Test 3: Password too long (byte length > 72)
    print("  3. Testing password too long (> 50 chars)...")
    long_password = "a" * 55  # This will be over 50 chars and 72 bytes
    response = requests.post(f"{BASE_URL}/signup", json={
        "username": "testuser789",
        "password": long_password
    })
    if response.status_code == 400:
        print("     ✓ Correctly rejected long password")
    else:
        print(f"     ✗ Should have rejected long password: {response.status_code}")
        return False
    
    # Test 4: Valid password with special characters (within limits)
    print("  4. Testing valid password with special characters...")
    response = requests.post(f"{BASE_URL}/signup", json={
        "username": "testuser000",
        "password": "valid!@#$%^&*()123"
    })
    print(f"     Status: {response.status_code}")
    if response.status_code == 200:
        print("     ✓ Valid password with special chars accepted")
    else:
        print(f"     ✗ Valid password with special chars rejected: {response.text}")
        return False
    
    # Test 5: Duplicate username
    print("  5. Testing duplicate username...")
    response = requests.post(f"{BASE_URL}/signup", json={
        "username": "testuser123",  # Already exists
        "password": "anotherpassword"
    })
    if response.status_code == 400:
        print("     ✓ Correctly rejected duplicate username")
    else:
        print(f"     ✗ Should have rejected duplicate username: {response.status_code}")
        return False
    
    print("  ✓ All signup tests passed!")
    return True

def test_login():
    """Test login functionality"""
    print("\nTesting login functionality...")
    
    # Test 1: Valid login
    print("  1. Testing valid login...")
    response = requests.post(f"{BASE_URL}/login", json={
        "username": "testuser123",
        "password": "validpass123"
    })
    if response.status_code == 200:
        print("     ✓ Valid login successful")
        token_data = response.json()
        auth_token = token_data.get("access_token")
        if auth_token:
            print("     ✓ Token received")
        else:
            print("     ✗ No token received")
            return False
    else:
        print(f"     ✗ Valid login failed: {response.text}")
        return False
    
    # Test 2: Invalid credentials
    print("  2. Testing invalid credentials...")
    response = requests.post(f"{BASE_URL}/login", json={
        "username": "nonexistentuser",
        "password": "wrongpassword"
    })
    if response.status_code == 401:
        print("     ✓ Correctly rejected invalid credentials")
    else:
        print(f"     ✗ Should have rejected invalid credentials: {response.status_code}")
        return False
    
    # Test 3: Empty credentials
    print("  3. Testing empty credentials...")
    response = requests.post(f"{BASE_URL}/login", json={
        "username": "",
        "password": ""
    })
    if response.status_code == 400:
        print("     ✓ Correctly rejected empty credentials")
    else:
        print(f"     ✗ Should have rejected empty credentials: {response.status_code}")
        return False
    
    print("  ✓ All login tests passed!")
    return True

def test_protected_route():
    """Test protected routes with authentication"""
    print("\nTesting protected route with authentication...")
    
    # First, login to get a valid token
    response = requests.post(f"{BASE_URL}/login", json={
        "username": "testuser123",
        "password": "validpass123"
    })
    
    if response.status_code != 200:
        print("     ✗ Could not get token for protected route test")
        return False
    
    token_data = response.json()
    auth_token = token_data.get("access_token")
    
    # Test accessing protected route
    print("  1. Testing access to protected route (/users/me)...")
    response = requests.get(f"{BASE_URL}/users/me", headers={
        "Authorization": f"Bearer {auth_token}"
    })
    
    if response.status_code == 200:
        print("     ✓ Successfully accessed protected route")
        user_data = response.json()
        if user_data.get("username") == "testuser123":
            print("     ✓ Correct user data returned")
        else:
            print(f"     ? Unexpected user data: {user_data}")
    else:
        print(f"     ✗ Failed to access protected route: {response.text}")
        return False
    
    # Test accessing protected route with invalid token
    print("  2. Testing access with invalid token...")
    response = requests.get(f"{BASE_URL}/users/me", headers={
        "Authorization": "Bearer invalid_token_12345"
    })
    if response.status_code == 401:
        print("     ✓ Correctly rejected invalid token")
    else:
        print(f"     ✗ Should have rejected invalid token: {response.status_code}")
        return False
    
    print("  ✓ All protected route tests passed!")
    return True

def run_all_tests():
    """Run all authentication tests"""
    print("Starting authentication system tests...\n")
    
    # Give the server a moment to be ready
    time.sleep(1)
    
    success = True
    success = test_signup() and success
    success = test_login() and success
    success = test_protected_route() and success
    
    print(f"\n{'='*50}")
    if success:
        print("✓ ALL TESTS PASSED! Authentication system is working correctly.")
    else:
        print("✗ SOME TESTS FAILED! Please check the authentication implementation.")
    print(f"{'='*50}")
    
    return success

if __name__ == "__main__":
    run_all_tests()