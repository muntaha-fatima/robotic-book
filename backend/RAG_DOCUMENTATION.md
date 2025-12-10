# RAG System Documentation

## Overview
This RAG (Retrieval-Augmented Generation) system uses:
- **Cohere** for text embeddings
- **Qdrant** for vector storage and similarity search
- **Neon Postgres** for user authentication and metadata

## Architecture
1. **Embedding Generation**: Cohere generates vector embeddings from text
2. **Vector Storage**: Qdrant stores embeddings with metadata
3. **Retrieval**: Vector similarity search retrieves relevant contexts
4. **Response Generation**: Returns context and sources for downstream processing

## Environment Variables Required
```bash
COHERE_API_KEY=your_cohere_api_key
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DB_URL=your_neon_postgres_connection_string
SECRET_KEY=your_jwt_secret_key
```

## API Endpoints

### Authentication Endpoints
- `POST /signup` - Create new user account
- `POST /login` - Authenticate user and get JWT
- `GET /users/me` - Get current user info (requires JWT)

### RAG Endpoints
- `POST /embeddings/upsert` - Store text embeddings in Qdrant (requires JWT)
- `POST /rag/query` - Query for relevant content (requires JWT)
- `POST /chat` - Complete RAG chat with generated responses (requires JWT)

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Environment Variables
Create `.env` file with required variables.

### 3. Run the Server
```bash
cd backend
python main.py
```

## Testing

### Example Curl Commands

#### 1. Sign up a new user:
```bash
curl -X POST http://localhost:8000/signup \
  -H 'Content-Type: application/json' \
  -d '{"username": "testuser", "password": "testpassword123"}'
```

#### 2. Log in:
```bash
curl -X POST http://localhost:8000/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "testuser", "password": "testpassword123"}'
```

#### 3. Upsert embeddings (replace TOKEN with actual JWT token):
```bash
curl -X POST http://localhost:8000/embeddings/upsert \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"text": "Artificial intelligence is a wonderful field that involves machine learning and neural networks."}'
```

#### 4. Query RAG system (replace TOKEN with actual JWT token):
```bash
curl -X POST http://localhost:8000/rag/query \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"query": "What is artificial intelligence?"}'
```

#### 5. Chat with RAG system (replace TOKEN with actual JWT token):
```bash
curl -X POST http://localhost:8000/chat \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"query": "What is artificial intelligence?"}'
```

## Postman Collection
Create a new collection in Postman with the following requests:

### Sign Up:
- Method: POST
- URL: http://localhost:8000/signup
- Headers: Content-Type: application/json
- Body: {"username": "testuser", "password": "testpassword123"}

### Login:
- Method: POST
- URL: http://localhost:8000/login
- Headers: Content-Type: application/json
- Body: {"username": "testuser", "password": "testpassword123"}

### Upsert Embeddings:
- Method: POST
- URL: http://localhost:8000/embeddings/upsert
- Headers: Content-Type: application/json, Authorization: Bearer [TOKEN]
- Body: {"text": "Your text here"}

### RAG Query:
- Method: POST
- URL: http://localhost:8000/rag/query
- Headers: Content-Type: application/json, Authorization: Bearer [TOKEN]
- Body: {"query": "Your query here"}

### Chat:
- Method: POST
- URL: http://localhost:8000/chat
- Headers: Content-Type: application/json, Authorization: Bearer [TOKEN]
- Body: {"query": "Your question here"}

## Expected Response Format

### RAG Query Response:
```json
{
  "query": "What is artificial intelligence?",
  "context": "Artificial intelligence is a wonderful field that involves machine learning and neural networks.",
  "sources": [
    {
      "text": "Artificial intelligence is a wonderful field that involves machine learning and neural networks.",
      "score": 0.85
    }
  ]
}
```

### Chat Response:
```json
{
  "query": "What is artificial intelligence?",
  "response": "Artificial intelligence (AI) is a branch of computer science that aims to create software or machines that exhibit human-like intelligence...",
  "context": "Artificial intelligence is a wonderful field that involves machine learning and neural networks.",
  "sources": [
    {
      "text": "Artificial intelligence is a wonderful field that involves machine learning and neural networks.",
      "score": 0.85
    }
  ]
}
```

## Error Handling

- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 500: Internal Server Error (API/service failures)

## Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**: Ensure .env file is in the backend directory
2. **Qdrant Connection Issues**: Check QDRANT_URL and QDRANT_API_KEY
3. **Cohere Embedding Issues**: Verify COHERE_API_KEY is valid
4. **Database Connection Issues**: Confirm NEON_DB_URL is correct

### Authentication Error (password authentication failed):
If you see an error like: `ERROR: password authentication failed for user 'neondb_owner'`

This means your Neon Postgres connection string is incorrect. Follow these steps:

1. Go to your Neon dashboard
2. Find your project and connection details
3. Copy the full connection string which should look like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```
4. Update your `NEON_DB_URL` in the .env file with the complete connection string
5. Make sure you're using the correct username and password from Neon

### Example Neon Connection String Format:
```
NEON_DB_URL=postgresql://your_username:your_password@ep-snowy-meadow-a4y7zfr3-pooler.us-east-1.aws.neon.tech/your_database_name?sslmode=require
```

### Testing Database Connection:
To test your database connection separately, you can use:
```bash
pip install psycopg2-binary
python -c "import psycopg2; conn = psycopg2.connect('your_connection_string'); print('Connected successfully')"
```

### Debugging Steps:
1. Verify all environment variables are correctly set in your `.env` file
2. Test each service (Cohere, Qdrant, Neon Postgres) individually
3. Check the server logs for specific error messages