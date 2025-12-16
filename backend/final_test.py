from main import app
print('FastAPI app imported successfully')

from document_loaders import DocumentLoader
print('DocumentLoader imported successfully')

from models import URLUpsertRequest, DocumentUpsertRequest
print('New models imported successfully')

print('All components working correctly!')