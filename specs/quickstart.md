# Quickstart Guide: Hackathon Todo Phase II

## Overview
This guide provides a quick introduction to setting up and running the Hackathon Todo Phase II application for development.

## Prerequisites
- Node.js 18+ for frontend development
- Python 3.11+ for backend development
- PostgreSQL-compatible database (Neon Serverless recommended)
- Git for version control
- A code editor (VS Code recommended)

## Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hackathon-todo-phase-ii
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Configuration

### 1. Backend Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@host:port/database_name"
SECRET_KEY="your-secret-key-for-jwt-signing"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
NEON_DATABASE_URL="your-neon-database-url"
BETTER_AUTH_SECRET="your-better-auth-secret"
```

### 2. Frontend Configuration
Create a `.env.local` file in the `frontend` directory with the following variables:

```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:8000/auth"
```

## Running the Application

### 1. Start the Backend
```bash
# From the backend directory
cd backend
uvicorn src.main:app --reload --port 8000
```

### 2. Start the Frontend
```bash
# From the frontend directory
cd frontend
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Documentation: http://localhost:8000/docs

## Development Workflow

### Backend Development
1. Make changes to the backend code in `backend/src/`
2. The server will automatically reload due to `--reload` flag
3. Test API endpoints using the interactive documentation at `/docs`

### Frontend Development
1. Make changes to the frontend code in `frontend/src/`
2. The development server will automatically reload
3. Access the application at http://localhost:3000

## Running Tests

### Backend Tests
```bash
# From the backend directory
cd backend
pytest
```

### Frontend Tests
```bash
# From the frontend directory
cd frontend
npm test
```

## Database Migrations
```bash
# From the backend directory
cd backend
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

## Authentication Flow
1. Register a new account at `/signup` or login at `/login`
2. Better Auth will handle the authentication flow
3. JWT tokens will be automatically included in API requests
4. Protected routes will check for valid authentication

## Troubleshooting

### Common Issues
- **Port already in use**: Change the port in the startup commands
- **Database connection errors**: Verify your DATABASE_URL is correct
- **Dependency issues**: Run `pip install -r requirements.txt` or `npm install` again

### Resetting the Development Environment
```bash
# Backend
cd backend
deactivate  # if virtual environment is active
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules
npm install
```

## Next Steps
1. Review the API documentation at http://localhost:8000/docs
2. Explore the frontend components in `frontend/src/components/`
3. Check the data models in `backend/src/models/`
4. Look at the API endpoints in `backend/src/api/`
5. Review the UI pages in `frontend/src/app/`