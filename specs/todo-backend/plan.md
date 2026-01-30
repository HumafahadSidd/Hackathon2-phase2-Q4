# Implementation Plan: Full-Stack Todo Application Backend

**Feature**: Full-Stack Todo Application Backend
**Branch**: `004-todo-backend`
**Created**: 2026-01-23
**Status**: Draft

## Technical Context

This implementation will create a production-ready backend for a full-stack todo application using FastAPI, SQLModel, Neon Serverless PostgreSQL, and Better Auth JWT authentication. The backend will provide task management functionality with AI-powered agents for enhanced user experience.

### Architecture Components
- **Backend Framework**: FastAPI (Python)
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth (JWT-based)
- **API Style**: REST
- **Frontend Integration**: Next.js 16 (App Router)

### Technology Stack
- Python 3.9+
- FastAPI 0.115.0
- SQLModel 0.0.22
- Neon Serverless PostgreSQL
- python-jose for JWT handling
- python-dotenv for environment management

### Unknowns
- Specific database connection parameters for Neon (NEEDS CLARIFICATION)
- Better Auth secret key format and generation (NEEDS CLARIFICATION)
- Production deployment configuration (NEEDS CLARIFICATION)

## Constitution Check

### Architecture Compliance
- [x] Adheres to Python FastAPI backend
- [x] Uses Neon Serverless PostgreSQL database
- [x] Uses SQLModel ORM
- [x] Implements Better Auth with JWT authentication

### Security Requirements
- [x] All API endpoints require JWT authentication
- [x] User data isolation enforced
- [x] Ownership checks on all data operations
- [x] Secure session management

### Multi-User Requirements
- [x] Users can only access their own data
- [x] Proper ownership verification on all operations
- [x] User ID foreign keys in all relevant tables

## Gates

### Gate 1: Architecture Compliance
✅ All architectural requirements met per specification

### Gate 2: Security Compliance  
✅ All security requirements met per specification

### Gate 3: Multi-User Compliance
✅ All multi-user requirements met per specification

## Phase 0: Outline & Research

### Research Tasks

#### 0.1: Database Connection Research
**Task**: Research Neon Serverless PostgreSQL connection parameters and best practices
- Decision: Use standard PostgreSQL connection string format with Neon-specific parameters
- Rationale: Neon is PostgreSQL-compatible, so standard connection patterns apply
- Alternatives considered: Different ORMs, but SQLModel was specified

#### 0.2: JWT Authentication Research
**Task**: Research Better Auth JWT implementation and token validation
- Decision: Use python-jose library for JWT validation with BETTER_AUTH_SECRET
- Rationale: python-jose is the recommended library for JWT handling in Python
- Alternatives considered: PyJWT, but python-jose has better async support

#### 0.3: FastAPI Best Practices Research
**Task**: Research FastAPI best practices for authentication and dependency injection
- Decision: Use FastAPI's dependency system with HTTPBearer for JWT validation
- Rationale: FastAPI's built-in security features provide clean authentication patterns
- Alternatives considered: Manual header parsing, but dependency injection is cleaner

## Phase 1: Design & Contracts

### 1.1: Data Model Design

#### Task Entity
- **id**: int (primary key, auto-generated)
- **user_id**: str (indexed, from JWT token)
- **title**: str (required, max 255 chars)
- **description**: str (optional, max 1000 chars)
- **completed**: bool (default false)
- **created_at**: datetime (auto-generated)
- **updated_at**: datetime (auto-generated)
- **due_date**: datetime (optional)

#### Relationships
- Task belongs to User (via user_id foreign key)

#### Validation Rules
- Title must be 1-255 characters
- Description must be ≤ 1000 characters
- Due date must be in the future if provided
- User can only access their own tasks

### 1.2: API Contract Design

#### Task API Endpoints
```
GET    /api/tasks          # Get all tasks for authenticated user
POST   /api/tasks          # Create new task
GET    /api/tasks/{id}     # Get specific task
PUT    /api/tasks/{id}     # Update task
DELETE /api/tasks/{id}     # Delete task
PATCH  /api/tasks/{id}/complete  # Toggle completion status
```

#### Agent API Endpoints
```
POST   /api/agents/daily      # Run daily task agent
GET    /api/agents/overdue    # Get overdue tasks
GET    /api/agents/priority   # Get priority tasks
POST   /api/agents/recurring  # Run recurring task agent
GET    /api/agents/stats      # Get task statistics
```

#### Authentication Contract
- All endpoints require `Authorization: Bearer <token>` header
- Invalid tokens return 401 Unauthorized
- User isolation enforced at database level

### 1.3: Folder Structure
```
backend/
├── main.py                 # Application entry point
├── db.py                   # Database connection
├── models.py               # SQLModel definitions
├── auth/
│   └── jwt.py              # JWT validation utilities
├── routes/
│   ├── tasks.py            # Task API routes
│   └── agents.py           # Agent API routes
├── agents/
│   ├── skills.py           # Reusable agent functions
│   └── agents.py           # Agent implementations
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
└── README.md              # Documentation
```

### 1.4: Authentication Flow
1. Frontend sends JWT in Authorization header
2. Backend validates JWT using BETTER_AUTH_SECRET
3. Extract user_id from token payload
4. Use user_id to filter database queries
5. Return 401 for invalid tokens

### 1.5: Agent Execution Flow
1. Skills layer provides reusable functions (createTask, listTasks, completeTask)
2. Agent classes implement specific logic using skills
3. API endpoints trigger agents with authenticated user context
4. Agents return structured responses to frontend

### 1.6: Frontend ↔ Backend Integration
- CORS configured for http://localhost:3000
- JSON request/response format
- JWT tokens passed from frontend auth system
- Consistent error handling with appropriate HTTP status codes

## Phase 2: Implementation Steps

### Step 2.1: Setup Project Structure
- Create directory structure
- Initialize requirements.txt
- Set up environment configuration

### Step 2.2: Implement Database Layer
- Configure Neon PostgreSQL connection
- Define Task model with SQLModel
- Set up database session management

### Step 2.3: Implement Authentication
- Create JWT validation utilities
- Implement user identification from tokens
- Set up authentication dependencies

### Step 2.4: Implement Task API
- Create task CRUD operations
- Enforce user isolation in all operations
- Add proper error handling

### Step 2.5: Implement Agent System
- Create skill functions (createTask, listTasks, completeTask)
- Implement agent classes with specific logic
- Add agent API endpoints

### Step 2.6: Integrate Components
- Connect authentication with task operations
- Ensure proper user isolation
- Add comprehensive error handling

### Step 2.7: Testing & Documentation
- Add API documentation
- Create usage examples
- Verify all requirements are met