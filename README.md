# Project-Management-System
🔐 Authentication
User Signup & Login
JWT-based authentication
Secure password handling
📁 Project Management
Create, update, and delete projects
Invite and manage team members
Role-based access (Admin / Member)
✅ Task Management
Create and assign tasks
Update task status (To-do, In Progress, Done)
Set deadlines and priorities
📊 Dashboard
Overview of all tasks
Progress tracking
Overdue task insights
🛠️ Tech Stack
Frontend
React + TypeScript
Vite
Tailwind CSS
Zustand (State Management)
Backend
Node.js
Express.js
SQLite (via Drizzle ORM)
JWT Authentication
bcrypt (Password hashing)
Deployment
Railway (Backend & Frontend)
📂 Project Structure
project-root/
│
├── frontend/          # React App (UI)
│   ├── src/
│   └── package.json
│
├── backend/           # Node.js API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
│
└── README.md
⚙️ Environment Variables
Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api
Backend (backend/.env)
PORT=5000
JWT_SECRET=your_secret_key
🚀 Getting Started
1️⃣ Clone Repository
git clone https://github.com/your-username/projecthub.git
cd projecthub
2️⃣ Setup Backend
cd backend
npm install
npm run start
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

👉 Open:

https://project-management-system-production-367a.up.railway.app/
🌐 Deployment (Railway)
Backend Deployment
Go to Railway
Create new project → Deploy from GitHub
Select backend folder
Add environment variables:
JWT_SECRET=your_secret
Deploy → Copy generated URL
Frontend Deployment
Deploy frontend folder on Railway
Update .env:
VITE_API_URL=https://your-backend-url/api
Redeploy frontend
🔗 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
DELETE /api/projects/:id
Tasks
GET /api/projects/:projectId/tasks
POST /api/projects/:projectId/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id
⚠️ Common Issues & Fixes
❌ API Not Working
Check VITE_API_URL
Ensure backend is running
❌ CORS Error
app.use(cors());
❌ 401 Unauthorized
Ensure token is stored in localStorage
📈 Future Improvements
Real-time updates (WebSockets)
File attachments in tasks
Notifications system
Advanced analytics dashboard
👨‍💻 Author

Ram Kumar
