#!/usr/bin/env python3
"""
Debug script for RAG functionality
This script tests the Cohere + Qdrant RAG system directly without authentication
"""
import os
import sys
from dotenv import load_dotenv
from qdrant_client import QdrantClient, models

# Load environment variables
load_dotenv()

# Load environment variables explicitly
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")

def test_qdrant_connection():
    """Test basic Qdrant connection"""
    print("Testing QDRant connection...")
    try:
        if not qdrant_url or not qdrant_api_key:
            print("ERROR: QDRANT_URL or QDRANT_API_KEY not set in environment variables")
            return None

        client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
        print("[OK] Qdrant client created successfully")

        # Test collections
        collections = client.get_collections()
        print(f"[OK] Available collections: {collections}")

        collection_name = "robotics-book"
        if hasattr(collections, 'collections'):
            existing_collections = [col.name for col in collections.collections]
        else:
            existing_collections = collections

        print(f"Collection '{collection_name}' exists: {collection_name in existing_collections}")

        if collection_name in existing_collections:
            # Test collection info
            collection_info = client.get_collection(collection_name)
            print(f"[OK] Collection '{collection_name}' info: {collection_info.config.params}")

        return client
    except Exception as e:
        print(f"[ERROR] Qdrant connection failed: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_cohere_embedding():
    """Test Cohere embedding generation"""
    print("\nTesting Cohere embedding...")
    try:
        from utils import get_cohere_embedder
        embedder = get_cohere_embedder()
        
        # Test embedding a document
        test_text = "Test document for debugging RAG system"
        embedding = embedder.embed_text(test_text, input_type="search_document")
        print(f"[OK] Document embedding generated, length: {len(embedding)}")

        # Test embedding a query
        test_query = "Test query for debugging"
        query_embedding = embedder.embed_query(test_query)
        print(f"[OK] Query embedding generated, length: {len(query_embedding)}")

        return embedder
    except Exception as e:
        print(f"[ERROR] Cohere embedding failed: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_qdrant_upsert(client):
    """Test Qdrant upsert functionality"""
    print("\nTesting Qdrant upsert...")
    try:
        collection_name = "robotics-book"
        from utils import get_cohere_embedder
        embedder = get_cohere_embedder()
        
        test_text = "This is a test document for debugging the RAG system."
        embedding = embedder.embed_text(test_text, input_type="search_document")
        
        # Upsert the document
        result = client.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id=abs(hash(test_text)) % (10**16),
                    vector=embedding,
                    payload={"text": test_text, "source": "debug_test"}
                )
            ],
            wait=True,
        )
        print(f"[OK] Upsert completed: {result}")
        return True
    except Exception as e:
        print(f"[ERROR] Qdrant upsert failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_qdrant_search(client):
    """Test Qdrant search functionality"""
    print("\nTesting Qdrant search...")
    try:
        collection_name = "robotics-book"
        from utils import get_cohere_embedder
        embedder = get_cohere_embedder()

        # Create a test query
        test_query = "What is this test document about?"
        query_embedding = embedder.embed_query(test_query)

        print(f"Testing search with query: '{test_query}'")
        print(f"Query embedding length: {len(query_embedding)}")

        # Try the search method
        try:
            search_results = client.search(
                collection_name=collection_name,
                query_vector=query_embedding,
                limit=3,
            )
            print(f"[OK] Search method worked, found {len(search_results)} results")
            print(f"First result: {search_results[0].payload if len(search_results) > 0 else 'No results'}")
        except AttributeError as e:
            print(f"Search method not available: {e}")
            # Try query_points method - newer Qdrant API
            try:
                search_results = client.query_points(
                    collection_name=collection_name,
                    query=query_embedding,
                    limit=3,
                )
                # Check if search_results is a scalar or a list
                if hasattr(search_results, '__len__') and hasattr(search_results[0], 'payload'):
                    print(f"[OK] query_points method worked, found {len(search_results)} results")
                    print(f"First result: {search_results[0].payload if len(search_results) > 0 else 'No results'}")
                else:
                    # Handle QueryResponse object
                    if hasattr(search_results, 'points'):
                        results_list = search_results.points
                        print(f"[OK] query_points method worked, found {len(results_list)} results")
                        print(f"First result: {results_list[0].payload if len(results_list) > 0 else 'No results'}")
                    else:
                        print(f"[OK] query_points method worked, but response format not recognized: {type(search_results)}")
                        return False
            except AttributeError as e2:
                print(f"query_points method also not available: {e2}")
                return False

        return True
    except Exception as e:
        print(f"[ERROR] Qdrant search failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    print("RAG Debug Script")
    print("="*60)
    
    # Test Qdrant connection
    qdrant_client = test_qdrant_connection()
    if not qdrant_client:
        print("Cannot proceed without Qdrant connection")
        return
    
    # Test Cohere embedding
    embedder = test_cohere_embedding()
    if not embedder:
        print("Cannot proceed without Cohere embeddings")
        return
    
    # Test upsert
    upsert_ok = test_qdrant_upsert(qdrant_client)
    if not upsert_ok:
        print("Upsert failed, but continuing to search test...")
    
    # Test search
    search_ok = test_qdrant_search(qdrant_client)
    
    print("\n" + "="*60)
    if search_ok:
        print("[OK] All tests passed! RAG system should work correctly.")
    else:
        print("[ERROR] Some tests failed. Check output above for details.")
    print("="*60)

if __name__ == "__main__":
    main()