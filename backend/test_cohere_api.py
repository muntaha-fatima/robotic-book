import os
from dotenv import load_dotenv
load_dotenv()

import cohere

# Test the correct way to call Cohere
cohere_api_key = os.getenv("COHERE_API_KEY")
cohere_client = cohere.Client(cohere_api_key)

print("Testing different Cohere API methods...")

# Test 1: Check if generate method exists (older API)
try:
    # This is the old way
    response = cohere_client.generate(
        model='command-r-plus',
        prompt='Hello, how are you?',
        max_tokens=50,
        temperature=0.7
    )
    print("✓ Generate method works")
    print(f"Response: {response.generations[0].text[:50]}...")
except AttributeError:
    print("✗ Generate method does not exist")
    print("  The generate method has been deprecated in newer versions of the Cohere SDK")
except Exception as e:
    print(f"- Generate method failed: {e}")

# Test 2: Try chat method (newer API)
try:
    response = cohere_client.chat(
        model='command-r-plus',
        message='Hello, how are you?',
        max_tokens=50,
        temperature=0.7
    )
    print("✓ Chat method works")
    print(f"Response: {response.text[:50]}...")
except Exception as e:
    print(f"- Chat method failed: {e}")

# Test 3: Try the embed method that we know works
try:
    response = cohere_client.embed(
        texts=['Hello, how are you?'],
        model='embed-english-v3.0',
        input_type='search_document'
    )
    print("+ Embed method works")
    print(f"Embedding length: {len(response.embeddings[0])}")
except Exception as e:
    print(f"- Embed method failed: {e}")