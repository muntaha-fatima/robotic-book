from qdrant_client import QdrantClient

# Create a client (might not connect, but we can check the interface)
try:
    # Try to create a client without connecting
    client = QdrantClient(host="0.0.0.0", port=6333)  # This won't connect but will have methods
    print("Client created, checking methods...")
    
    # Get the class methods specifically
    import qdrant_client.http.api.points_api
    import qdrant_client.http.models as rest
    print("Qdrant client has search method:", hasattr(client, 'search'))
    
    # Check for the main methods that should exist in Qdrant
    methods_to_check = ['search', 'scroll', 'retrieve', 'query']
    for method in methods_to_check:
        print(f"Has '{method}' method: {hasattr(client, method)}")
        
except Exception as e:
    print(f"Error creating client: {e}")
    print("Let's check the class directly...")
    
    # Check the client class methods
    methods = [method for method in dir(QdrantClient) if not method.startswith('_')]
    print("Class methods:", methods[:20])  # First 20
    
    # Try creating instance without connection params to see methods
    import unittest.mock
    with unittest.mock.patch('httpx.Client'):
        try:
            client = QdrantClient(location=":memory:")  # Create in-memory client
            instance_methods = [method for method in dir(client) if not method.startswith('_') and callable(getattr(client, method, None))]
            print("Instance methods:", instance_methods[:20])  # First 20
            print("Has search method:", hasattr(client, 'search'))
        except Exception as e2:
            print(f"Could not create test client: {e2}")
            # Based on documentation, the search method should exist
            print("According to Qdrant documentation, the client should have a .search() method.")
            print("The correct syntax is: client.search(collection_name=..., query_vector=..., limit=...)")