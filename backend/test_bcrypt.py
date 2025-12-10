# Test script to isolate the password hashing issue
import sys
sys.path.append('.')

from passlib.context import CryptContext
import logging

# Set up password hashing context  
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def test_password_hashing():
    test_passwords = [
        "testpassword123",  # Normal password
        "a" * 50,  # Longer password
        "a" * 70,  # Near bcrypt limit
        "a" * 75,  # Over bcrypt limit - this might cause issues
    ]
    
    for i, password in enumerate(test_passwords):
        print(f"Test {i+1}: Testing password of length {len(password)}")
        try:
            # Try hashing
            hashed = pwd_context.hash(password)
            print(f"  Hashing: Success")
            
            # Try verifying
            is_valid = pwd_context.verify(password, hashed)
            print(f"  Verification: {is_valid}")
            
            # Test with a truncated version if needed
            if len(password.encode('utf-8')) > 72:
                truncated = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
                is_valid_truncated = pwd_context.verify(truncated, hashed)
                print(f"  Verification with truncated: {is_valid_truncated}")
                
        except Exception as e:
            print(f"  Error: {str(e)}")
        print()

def test_password_truncation():
    print("Testing password truncation approach")
    long_password = "a" * 75  # Over the bcrypt limit
    
    try:
        # Truncate to 72 bytes first
        truncated_password = long_password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
        print(f"Original length: {len(long_password)}, Truncated length: {len(truncated_password)}")
        
        # Try hashing the truncated version
        hashed = pwd_context.hash(truncated_password)
        print("Hashed truncated version successfully")
        
        # Try verifying with original
        is_valid_orig = pwd_context.verify(long_password, hashed)
        print(f"Verify original: {is_valid_orig}")
        
        # Try verifying with truncated
        is_valid_truncated = pwd_context.verify(truncated_password, hashed)
        print(f"Verify truncated: {is_valid_truncated}")
        
    except Exception as e:
        print(f"Error in truncation test: {str(e)}")

if __name__ == "__main__":
    print("Testing password hashing library...")
    test_password_hashing()
    print("\n" + "="*50 + "\n")
    test_password_truncation()