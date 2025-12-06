# Constitution of the Physical AI & Humanoid Robotics Hackathon Project

## Project Name
**physical-ai-humanoid-robotics**

## Vision & Mission
**Vision:** To bridge the gap between digital AI and physical embodiment, creating humanoid robots that can perceive, plan, and act in human environments.  
**Mission:** Equip students with the skills to design, simulate, and deploy humanoid robots using ROS 2, Gazebo, Unity, NVIDIA Isaac, and integrate LLMs for cognitive planning.

## Core Values
- Innovation & Creativity
- Collaboration & Teamwork
- Code Quality & Documentation
- Safety & Ethics in Robotics
- Embodied Intelligence & Real-World Interaction

## Team Roles & Responsibilities
| Role | Responsibility |
|------|----------------|
| Team Lead | Oversees project progress, coordinates modules |
| Frontend Dev | Builds Docusaurus book, interactive components |
| Backend Dev | Implements FastAPI endpoints, Qdrant & Neon integration |
| Robotics Specialist | Designs URDF, ROS 2 nodes, Gazebo/Unity simulations |
| AI/ML Specialist | Implements LLM integration, Isaac AI pipelines |
| Documentation | Maintains markdown content, README, guides |

## Coding Standards
- **Language:** TypeScript (Frontend), Python 3.11 (Backend)
- **Frontend:** React + Docusaurus MDX
- **Backend:** FastAPI, PEP8 compliant
- **Commit Messages:** Conventional commits (`feat:`, `fix:`, `docs:`)
- **Folder Structure:** Consistent modules and separation of concerns
- **Documentation:** Each module must have `README.md` + code comments

## Branching & Git Strategy
- **main:** Production-ready code
- **dev:** Integration branch
- **feature/<name>:** Individual feature branches
- Pull requests must be reviewed by at least 1 peer
- Merge only after passing all tests

## Deployment & Environment
- Use `.env` files with placeholders (`<OPENAI_KEY>`, `<QDRANT_URL>`, `<NEON_DB_URL>`, etc.)
- Frontend deploy via Docusaurus → GitHub Pages or Vercel
- Backend deploy via Docker / cloud instance
- Dockerfiles and GitHub Actions must be included

## Security Guidelines
- Do not expose API keys
- Ensure Qdrant and NeonDB credentials are secure
- User profiles must be stored securely
- Handle humanoid robot commands safely in simulation or real-world

## Modules Overview

- Module 1: The Robotic Nervous System (ROS 2)
- Focus: Middleware for robot control.
- ROS 2 Nodes, Topics, and Services.
- Bridging Python Agents to ROS controllers using rclpy.
- Understanding URDF (Unified Robot Description Format) for humanoids.


- Module 2: The Digital Twin (Gazebo & Unity)
- Focus: Physics simulation and environment building.
- Simulating physics, gravity, and collisions in Gazebo.
- High-fidelity rendering and human-robot interaction in Unity.
- Simulating sensors: LiDAR, Depth Cameras, and IMUs.


- Module 3: The AI-Robot Brain (NVIDIA Isaac™)
- Focus: Advanced perception and training.
- NVIDIA Isaac Sim: Photorealistic simulation and synthetic - data generation.
- Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation.
- Nav2: Path planning for bipedal humanoid movement.


- Module 4: Vision-Language-Action (VLA)
- Focus: The convergence of LLMs and Robotics.	
- Voice-to-Action: Using OpenAI Whisper for voice commands.
- Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into a sequence of ROS 2 actions.
- Capstone Project: The Autonomous Humanoid. A final project where a simulated robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it.

## Assessments
- ROS 2 package project
- Gazebo simulation implementation
- Isaac AI perception pipeline
- Capstone: Autonomous Humanoid with conversational AI

Requirements:
1) Create these frontend components (TypeScript/React, ready for Docusaurus MDX):
   - RAGChatbot.tsx
   - UrduTranslateButton.tsx
   - PersonalizeButton.tsx
2) Build a FastAPI backend (Python) with these endpoints:
   - /embeddings/upsert → OpenAI embeddings (model: text-embedding-3-small; vector_size=1536) → Qdrant upsert
   - /rag/query → semantic search in Qdrant → LLM answer generation
   - /translate → chapter translation to Urdu
   - /personalize → rewrite chapter based on user profile
3) Integrate Qdrant Cloud and NeonDB (provide connection placeholders and init scripts).
4) Create signup & signin frontend using Better-Auth and persist user profiles in NeonDB.
5) Make everything mobile-friendly and easily deployable (provide Dockerfile(s), GitHub Actions for Docusaurus → GitHub Pages/Vercel, and a deploy guide).

Produce:
- folder structure
- all source code (frontend + backend)
- all content 
- all configuration & deployment files
- example .env.example and README with run & deploy steps

Constraints:
- Do NOT include long explanations. Do NOT output extraneous commentary.
- If you reach a generation limit, continue automatically until all files are produced.
- Mark any placeholders clearly (e.g., `<OPENAI_KEY>`, `<QDRANT_URL>`, `<GITHUB_USER>`).

Do NOT explain. Just generate the files exactly in project format.

## Change Log & Contributions
- All contributions must be documented with date and contributor name
- Use GitHub Issues and PR templates for tracking
- Maintain semantic versioning

---