# Todo App Backend

This is a production-ready backend for a full-stack todo application built with FastAPI, SQLModel, and Neon Serverless PostgreSQL.

## Tech Stack

- **Backend Framework**: FastAPI (Python)
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth (JWT-based)
- **API Style**: REST

## Features

- Complete CRUD operations for tasks
- JWT-based authentication and authorization
- User isolation (users can only access their own tasks)
- AI-powered task agents:
  - Daily Task Agent: Creates default daily tasks
  - Overdue Task Agent: Identifies overdue tasks
  - Priority Agent: Suggests high-priority tasks
  - Recurring Task Agent: Handles recurring tasks
  - Task Stats Agent: Provides task statistics

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Database URL for Neon Serverless PostgreSQL
NEON_DB_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Secret key for JWT token verification (Better Auth)
BETTER_AUTH_SECRET=your_better_auth_secret_here
```

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables (see above)

3. Run the application:
```bash
uvicorn main:app --reload
```

## API Endpoints

### Task Endpoints (All require JWT)

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a specific task
- `DELETE /api/tasks/{task_id}` - Delete a specific task
- `PATCH /api/tasks/{task_id}/complete` - Toggle task completion status

### Agent Endpoints (All require JWT)

- `POST /api/agents/daily` - Run daily task agent
- `GET /api/agents/overdue` - Get overdue tasks
- `GET /api/agents/priority` - Get priority tasks
- `POST /api/agents/recurring` - Run recurring task agent
- `GET /api/agents/stats` - Get task statistics

## Authentication

The backend verifies JWT tokens issued by Better Auth. The token should be sent in the Authorization header as a Bearer token:

```
Authorization: Bearer <token>
```

The user ID is extracted from the token and used to enforce user isolation at the database level.

## Database Models

### Task Model

- `id` (int, primary key)
- `user_id` (string, indexed) - extracted from JWT
- `title` (string, required)
- `description` (text, optional)
- `completed` (boolean, default false)
- `created_at` (datetime)
- `updated_at` (datetime)
- `due_date` (optional datetime)