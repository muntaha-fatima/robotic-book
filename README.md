# Physical AI & Humanoid Robotics RAG System

**Vision:** To bridge the gap between digital AI and physical embodiment, creating humanoid robots that can perceive, plan, and act in human environments.

**Mission:** Equip students with the skills to design, simulate, and deploy humanoid robots using ROS 2, Gazebo, Unity, NVIDIA Isaac, and integrate LLMs for cognitive planning.

## Project Structure

```
robotic-book/
├── backend/              # FastAPI backend with RAG functionality
├── frontend/             # Docusaurus frontend with interactive components
├── .github/workflows/    # GitHub Actions for deployment
├── .specify/memory/      # Project specifications
├── docker-compose.yml    # Docker compose configuration
├── DEPLOYMENT.md         # Deployment guide
└── README.md             # This file
```

## Features

- **RAG Chatbot**: Query your robotics knowledge base with semantic search
- **Urdu Translation**: Translate content to Urdu using LLMs
- **Personalization**: Content tailored to user profiles
- **Authentication**: Secure signup/login with Better-Auth
- **Vector Storage**: Qdrant for embeddings and semantic search
- **User Profiles**: Stored securely in NeonDB

## Installation & Setup

### Prerequisites

- Node.js 18+
- Python 3.11
- Docker & Docker Compose
- Access to Qwen API

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file with your credentials:
```bash
QWEN_API_KEY="your_qwen_api_key_here"
QDRANT_URL="https://your-qdrant-cluster-id.region.cloud.qdrant.io"
QDRANT_API_KEY="your_qdrant_api_key_here"
NEON_DB_URL="postgresql://username:password@endpoint.neon.tech/dbname?sslmode=require"
SECRET_KEY="a_very_secure_secret_key"
```

5. Start the backend:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_BACKEND_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

## Modules Overview

### Module 1: The Robotic Nervous System (ROS 2)
- **Focus:** Middleware for robot control.
- ROS 2 Nodes, Topics, and Services.
- Bridging Python Agents to ROS controllers using rclpy.
- Understanding URDF (Unified Robot Description Format) for humanoids.

### Module 2: The Digital Twin (Gazebo & Unity)
- **Focus:** Physics simulation and environment building.
- Simulating physics, gravity, and collisions in Gazebo.
- High-fidelity rendering and human-robot interaction in Unity.
- Simulating sensors: LiDAR, Depth Cameras, and IMUs.

### Module 3: The AI-Robot Brain (NVIDIA Isaac™)
- **Focus:** Advanced perception and training.
- NVIDIA Isaac Sim: Photorealistic simulation and synthetic data generation.
- Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation.
- Nav2: Path planning for bipedal humanoid movement.

### Module 4: Vision-Language-Action (VLA)
- **Focus:** The convergence of LLMs and Robotics.
- Voice-to-Action: Using transcription for voice commands.
- Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into a sequence of ROS 2 actions.
- Capstone Project: The Autonomous Humanoid. A final project where a simulated robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it.

## API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /users/me` - Get current user

### RAG System
- `POST /embeddings/upsert` - Add document embeddings to vector store
- `POST /rag/query` - Query the RAG system with semantic search
- `POST /translate` - Translate content to Urdu
- `POST /personalize` - Personalize content based on user profile

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

### Coding Standards
- **Language:** TypeScript (Frontend), Python 3.11 (Backend)
- **Frontend:** React + Docusaurus MDX
- **Backend:** FastAPI, PEP8 compliant
- **Commit Messages:** Conventional commits (`feat:`, `fix:`, `docs:`)
- **Folder Structure:** Consistent modules and separation of concerns
- **Documentation:** Each module must have `README.md` + code comments

### Branching Strategy
- **main:** Production-ready code
- **dev:** Integration branch
- **feature/<name>:** Individual feature branches
- Pull requests must be reviewed by at least 1 peer
- Merge only after passing all tests

## Security Guidelines

- Do not expose API keys in code or public repositories
- Ensure Qdrant and NeonDB credentials are secure
- User profiles must be stored securely
- Handle humanoid robot commands safely in simulation or real-world

## Roadmap

Upcoming modules and features:
1. ROS 2 integration for physical robot control
2. Gazebo/Unity simulation interfaces
3. NVIDIA Isaac perception pipelines
4. Voice command processing
5. Advanced cognitive planning capabilities

## License

This project follows the MIT License.