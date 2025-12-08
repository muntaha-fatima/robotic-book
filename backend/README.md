# Backend - FastAPI Application

This directory contains the FastAPI application that serves as the backend for the robotics book project. It handles AI/ML integrations, data management, and user authentication.

## Setup and Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    ./venv/Scripts/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Variables:**
    Create a `.env` file in the `backend/` directory based on `backend/.env.example`.

    ```
    GEMINI_API_KEY=<your_gemini_api_key>
    QDRANT_URL=<your_qdrant_url>
    QDRANT_API_KEY=<your_qdrant_api_key>
    NEON_DB_URL=<your_neon_db_url>
    SECRET_KEY=<a_strong_secret_key_for_auth>
    ```

5.  **Run the application:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The API will be available at `http://localhost:8000`.

## Endpoints

-   `/` (GET): Welcome message.
-   `/signup` (POST): Register a new user.
-   `/login` (POST): Authenticate a user and get a token.
-   `/users/me` (GET): Get current user information (requires authentication).
-   `/embeddings/upsert` (POST): Create Gemini embeddings and upsert to Qdrant.
-   `/rag/query` (POST): Perform semantic search in Qdrant and generate LLM answer.
-   `/translate` (POST): Translate text to Urdu using LLM.
-   `/personalize` (POST): Rewrite text based on user profile using LLM.

## Deployment

Instructions for deploying the backend to a cloud instance will be added here. This will likely involve Docker.
