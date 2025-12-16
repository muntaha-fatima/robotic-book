from document_loaders import DocumentLoader

# Test the chunking functionality
sample_text = 'This is a sample document with multiple sentences. ' * 20
print(f'Original text: {sample_text[:100]}...')
print(f'Original text length: {len(sample_text)}')

chunks = DocumentLoader.chunk_text(sample_text, chunk_size=100, chunk_overlap=20)
print(f'Number of chunks: {len(chunks)}')
print(f'First chunk: {chunks[0][:50]}...')
print(f'Chunk lengths: {[len(chunk) for chunk in chunks]}')

print("\nTesting URL loading capability...")
print("The URL loading functionality is implemented but requires an actual URL to test.")
print("When a URL is provided to the /documents/load-from-url endpoint, it will:")
print("- Fetch the content from the URL")
print("- Parse it based on content type (HTML, PDF, etc.)")
print("- Chunk the content")
print("- Generate embeddings for each chunk")
print("- Store the embeddings in Qdrant with metadata")