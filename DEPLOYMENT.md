# Deployment Guide for Physical AI Humanoid Robotics

This guide provides instructions for deploying the Physical AI Humanoid Robotics RAG system.

## Prerequisites

- Docker and Docker Compose installed
- Access to Qdrant Cloud (for vector storage)
- Access to NeonDB (for user authentication and profiles)
- Qwen API key

## Environment Variables

Before deployment, you need to set up your environment variables:

### Backend (.env)
```bash
QWEN_API_KEY="your_qwen_api_key_here"
QDRANT_URL="https://your-qdrant-cluster-id.region.cloud.qdrant.io"
QDRANT_API_KEY="your_qdrant_api_key_here"
NEON_DB_URL="postgresql://username:password@endpoint.neon.tech/dbname?sslmode=require"
SECRET_KEY="a_very_secure_secret_key"
```

### Frontend (.env)
```bash
REACT_APP_BACKEND_URL="https://your-deployed-backend-url.com"
```

## Deployment Options

### Option 1: Docker Deployment (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd robotic-book
```

2. Set up environment files in both frontend and backend directories

3. Build and run with Docker Compose:
```bash
docker-compose up --build -d
```

### Option 2: Separate Frontend and Backend Deployment

#### Backend Deployment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the Docker image:
```bash
docker build -t robotic-book-backend .
```

3. Run the backend container:
```bash
docker run -d -p 8000:8000 --env-file .env robotic-book-backend
```

#### Frontend Deployment

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Build the Docker image:
```bash
docker build -t robotic-book-frontend .
```

3. Run the frontend container:
```bash
docker run -d -p 80:80 --env-file .env robotic-book-frontend
```

### Option 3: Cloud Deployment (Docker + Cloud Provider)

For deployment to cloud platforms like AWS, Azure, or GCP, follow the same Docker approach but use your cloud provider's container service:

- AWS: Use ECS or Fargate
- Azure: Use Container Instances or AKS
- GCP: Use Cloud Run or GKE

## GitHub Actions Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. To set this up:

1. Enable GitHub Pages in your repository settings
2. Ensure the workflow file `.github/workflows/deploy.yml` exists
3. The workflow will build and deploy the Docusaurus site automatically

## Docker Compose Configuration

If you want to use Docker Compose for local deployment, create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - QWEN_API_KEY=${QWEN_API_KEY}
      - QDRANT_URL=${QDRANT_URL}
      - QDRANT_API_KEY=${QDRANT_API_KEY}
      - NEON_DB_URL=${NEON_DB_URL}
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8000

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: robotic_book
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

## Verification

After deployment:

1. Access the frontend at `http://localhost` (or your domain)
2. Access the backend API documentation at `http://localhost:8000/docs`
3. Create an account via `/signup`
4. Test the RAG functionality with `/rag/query`
5. Verify translation and personalization features work correctly

## Troubleshooting

- If the backend doesn't start, check that all environment variables are set correctly
- If the frontend can't connect to the backend, verify the `REACT_APP_BACKEND_URL` is correct
- Check container logs with `docker logs <container-name>`
- Ensure Qdrant and NeonDB are accessible from your deployment environment

## Scaling Considerations

- For production, consider using a load balancer with multiple backend instances
- Set up monitoring and logging
- Implement proper SSL certificates
- Consider using Redis for session management at scale