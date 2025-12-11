import os
import sys
import traceback
from dotenv import load_dotenv

# Load environment
load_dotenv()

print("Environment loaded")
print(f"COHERE_API_KEY: {'Exists' if os.getenv('COHERE_API_KEY') else 'Missing'}")
print(f"QDRANT_URL: {'Exists' if os.getenv('QDRANT_URL') else 'Missing'}")
print(f"QDRANT_API_KEY: {'Exists' if os.getenv('QDRANT_API_KEY') else 'Missing'}")

try:
    import cohere
    print("+ Cohere module imported successfully")
except ImportError as e:
    print(f"- Failed to import cohere: {e}")
    sys.exit(1)

try:
    from qdrant_client import QdrantClient
    print("+ Qdrant client imported successfully")
except ImportError as e:
    print(f"- Failed to import qdrant_client: {e}")

try:
    from utils import get_cohere_embedder
    print("+ Utils module imported successfully")

    # Test embedder creation
    embedder = get_cohere_embedder()
    print("+ Embedder created successfully")

    # Test text embedding
    embedding = embedder.embed_text("Hello world", input_type="search_document")
    print(f"+ Text embedding successful, length: {len(embedding)}")

    # Test query embedding
    query_embedding = embedder.embed_query("Hello query")
    print(f"+ Query embedding successful, length: {len(query_embedding)}")

except Exception as e:
    print(f"- Embedder test failed: {e}")
    traceback.print_exc()

try:
    # Test qdrant connection
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")

    if qdrant_url and qdrant_api_key:
        qdrant_client = QdrantClient(
            url=qdrant_url,
            api_key=qdrant_api_key,
        )
        print("+ Qdrant client connected successfully")

        # Test a simple operation
        try:
            collections = qdrant_client.get_collections()
            print(f"+ Successfully retrieved collections: {[col.name for col in collections.collections]}")
        except Exception as e:
            print(f"- Could not retrieve collections: {e}")
    else:
        print("! Skipping Qdrant connection test - credentials missing")

except Exception as e:
    print(f"- Qdrant connection failed: {e}")
    traceback.print_exc()

print("Debug test completed")