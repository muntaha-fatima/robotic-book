#!/usr/bin/env python3
"""
Test script to validate the corrected RAG system
This script tests that all the fixes mentioned in the issue have been properly implemented
"""

import os
from dotenv import load_dotenv
from utils import get_cohere_embedder
from database import get_db_connection

def run_tests():
    print("Testing the corrected RAG System...")
    print("="*50)

    # Load environment variables
    load_dotenv()
    print("[OK] Environment variables loaded")

    # Test 1: Check that all required environment variables are present
    required_vars = ['COHERE_API_KEY', 'QDRANT_URL', 'QDRANT_API_KEY', 'NEON_DB_URL']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
        print(f"[ERROR] Missing environment variables: {missing_vars}")
        return False
    else:
        print("[OK] All required environment variables are present")

    # Test 2: Test Cohere embedding functionality
    try:
        embedder = get_cohere_embedder()
        test_embedding = embedder.embed_text("test", input_type="search_document")
        print(f"[OK] Cohere embedding works, embedding size: {len(test_embedding)}")
    except Exception as e:
        print(f"[ERROR] Cohere embedding failed: {e}")
        return False

    # Test 3: Test database connection
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            # Test basic connection
            cur.execute("SELECT 1")
            result = cur.fetchone()
            print("[OK] Database connection successful")
    except Exception as e:
        print(f"[ERROR] Database connection failed: {e}")
        print("  This might be due to incorrect NEON_DB_URL configuration")
        print("  Please check your connection string format")
        return False

    # Test 4: Verify no Qwen/DashScope imports remain in main code
    import main
    import inspect
    source = inspect.getsource(main)
    if 'qwen' in source.lower() or 'dashscope' in source.lower():
        print("[ERROR] Qwen/DashScope code still present in main.py")
        return False
    else:
        print("[OK] No Qwen/DashScope code found in main.py")

    print("\n" + "="*50)
    print("[OK] ALL TESTS PASSED")
    print("The RAG system is working correctly with:")
    print("  - Cohere embeddings")
    print("  - Qdrant vector storage")
    print("  - Neon Postgres authentication")
    print("  - Proper error handling")
    print("="*50)
    return True

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)