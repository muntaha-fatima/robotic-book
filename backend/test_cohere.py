import os
import sys

# Add the current directory to the path
sys.path.append('.')

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Get your API key
api_key = os.getenv('COHERE_API_KEY')
print('Using API key:', 'Yes' if api_key else 'No')

if api_key:
    try:
        import cohere
        # Create Cohere client
        co = cohere.Client(api_key)
        
        print("Testing Cohere connection...")
        # Test the API with a simple embed request
        response = co.embed(
            texts=['test'],
            model='embed-english-v3.0',
            input_type='search_document'
        )
        print('Cohere embed test: SUCCESS')
        print('Embedding length:', len(response.embeddings[0]) if response.embeddings else 'No embeddings')
    except Exception as e:
        print('Cohere API test: FAILED -', str(e))
        import traceback
        traceback.print_exc()
else:
    print('No Cohere API key found')