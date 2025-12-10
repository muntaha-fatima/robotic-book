# Frontend - Docusaurus Website

This directory contains the Docusaurus-based frontend for the robotics book project. It provides documentation, interactive components, and user interfaces for interacting with the backend.

## Setup and Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `frontend/` directory based on `frontend/.env.example`.

    ```
    # Example:
    # REACT_APP_BACKEND_URL=http://localhost:8000
    ```

4.  **Run the development server:**
    ```bash
    npm run start
    ```
    The Docusaurus website will be available at `http://localhost:3000`.

## Building the Website

To build the static website content:

```bash
npm run build
```
The build output will be in the `build/` directory.

## Deployment

The frontend is configured for automatic deployment to GitHub Pages via a GitHub Actions workflow.
See the `.github/workflows/deploy.yml` file for details on the CI/CD pipeline.
Alternatively, you can manually deploy the `build/` directory content to any static hosting service.