# Project-Management-System
<p align="center"> <b>A full-stack project management web app to manage projects, assign tasks, and track progress with role-based access.</b> </p> <p align="center"> <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" /> <img src="https://img.shields.io/badge/Database-SQLite-orange?style=for-the-badge" /> <img src="https://img.shields.io/badge/Deployment-Railway-purple?style=for-the-badge" /> </p>
📌 Overview

ProjectHub is a modern project management application that enables teams to collaborate efficiently by creating projects, assigning tasks, and tracking progress in real-time.

✨ Features
🔐 Authentication
Secure Signup & Login
JWT-based authentication
Password hashing with bcrypt
📁 Project Management
Create, update, and delete projects
Invite and manage team members
Role-based access (Admin / Member)
✅ Task Management
Create and assign tasks
Track status (To-do, In Progress, Done)
Set deadlines and priorities
📊 Dashboard
Task overview and analytics
Progress tracking
Overdue task alerts
🛠️ Tech Stack
Layer	Technology
Frontend	React, TypeScript, Vite, Tailwind CSS
State Mgmt	Zustand
Backend	Node.js, Express.js
Database	SQLite (Drizzle ORM)
Auth	JWT, bcrypt
Deployment	Railway
📂 Project Structure
projecthub/
│
├── frontend/          # React Application
│   ├── src/
│   └── package.json
│
├── backend/           # Node.js Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
│
└── README.md
⚙️ Environment Variables
📍 Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api
📍 Backend (backend/.env)
PORT=5000
JWT_SECRET=your_secret_key
🚀 Getting Started
1️⃣ Clone the Repository
git clone (https://github.com/ramkumar0402/Project-Management-System)
cd projecthub
2️⃣ Setup Backend
cd backend
npm install
npm start
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

🌐 Open in browser:

https://project-management-system-production-367a.up.railway.app/
🌐 Deployment on Railway
🚀 Backend Deployment
Go to Railway Dashboard
Click New Project → Deploy from GitHub
Select your repository
Set root directory to backend
Add environment variable:
JWT_SECRET=your_secret
Deploy and copy backend URL
🎨 Frontend Deployment
Deploy frontend as a new service
Update .env:
VITE_API_URL=https://your-backend-url/api
Redeploy frontend
🔗 API Endpoints
🔐 Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
📁 Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
DELETE /api/projects/:id
✅ Tasks
GET /api/projects/:projectId/tasks
POST /api/projects/:projectId/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id
⚠️ Common Issues
❌ API Not Working
Check VITE_API_URL
Ensure backend is running
❌ CORS Error
app.use(cors());
❌ 401 Unauthorized
Ensure token is stored in localStorage
📈 Future Improvements
🔔 Real-time notifications
📎 File attachments
📊 Advanced analytics
⚡ WebSocket integration
👨‍💻 Author

Ram Kumar
