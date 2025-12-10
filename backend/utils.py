import os
import cohere
from typing import List

class CohereEmbedder:
    def __init__(self, api_key: str = None):
        if not api_key:
            api_key = os.getenv("COHERE_API_KEY")
        if not api_key:
            raise ValueError("COHERE_API_KEY environment variable is required")

        self.client = cohere.Client(api_key)
        self.model = "embed-english-v3.0"

    def embed_text(self, text: str, input_type: str = "search_document") -> List[float]:
        """Generate embeddings for a single text"""
        try:
            response = self.client.embed(texts=[text], model=self.model, input_type=input_type)
            return response.embeddings[0]
        except Exception as e:
            print(f"Error generating embedding for text '{text[:50]}...': {str(e)}")
            raise

    def embed_query(self, text: str) -> List[float]:
        """Generate embeddings for a query text (specialized for search)"""
        try:
            response = self.client.embed(texts=[text], model=self.model, input_type="search_query")
            return response.embeddings[0]
        except Exception as e:
            print(f"Error generating query embedding for text '{text[:50]}...': {str(e)}")
            raise

    def embed_texts(self, texts: List[str], input_type: str = "search_document") -> List[List[float]]:
        """Generate embeddings for a list of texts"""
        try:
            response = self.client.embed(texts=texts, model=self.model, input_type=input_type)
            return response.embeddings
        except Exception as e:
            print(f"Error generating embeddings: {str(e)}")
            raise

# Global instance
embedder = None

def get_cohere_embedder() -> CohereEmbedder:
    global embedder
    if embedder is None:
        api_key = os.getenv("COHERE_API_KEY")
        if not api_key:
            raise ValueError("COHERE_API_KEY environment variable is required")
        embedder = CohereEmbedder(api_key)
    return embedder