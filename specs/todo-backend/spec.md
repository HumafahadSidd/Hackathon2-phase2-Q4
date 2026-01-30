# Feature Specification: Full-Stack Todo Application Backend

**Feature Branch**: `004-todo-backend`
**Created**: 2026-01-23
**Status**: Draft
**Input**: User description: "You are a senior backend engineer. Build a COMPLETE production-ready backend for a Full-Stack Todo Application. ======================== TECH STACK ======================== - Backend Framework: FastAPI (Python) - ORM: SQLModel - Database: Neon Serverless PostgreSQL - Authentication: Better Auth (JWT-based) - API Style: REST - Frontend Integration: Next.js 16 (App Router) ======================== ENVIRONMENT VARIABLES ======================== Use environment variables (do NOT hardcode): - NEON_DB_URL - BETTER_AUTH_SECRET ======================== PROJECT STRUCTURE ======================== backend/ ├── main.py ├── db.py ├── models.py ├── auth/ │ └── jwt.py ├── routes/ │ ├── tasks.py │ └── agents.py ├── agents/ │ ├── skills.py │ └── agents.py └── requirements.txt ======================== DATABASE MODELS (SQLModel) ======================== Task table: - id (int, primary key) - user_id (string, indexed) - title (string, required) - description (text, optional) - completed (boolean, default false) - created_at (datetime) - updated_at (datetime) - due_date (optional) ======================== AUTHENTICATION (CRITICAL) ======================== - Backend MUST verify JWT issued by Better Auth - Read JWT from: Authorization: Bearer <token> - Validate token using BETTER_AUTH_SECRET - Extract user_id from token - Reject unauthorized requests with 401 - Ignore any user_id sent from frontend URL - Enforce user isolation at database level ======================== TASK API ENDPOINTS ======================== (All require JWT) GET /api/tasks POST /api/tasks GET /api/tasks/{task_id} PUT /api/tasks/{task_id} DELETE /api/tasks/{task_id} PATCH /api/tasks/{task_id}/complete Rules: - Each task belongs ONLY to authenticated user - Users cannot access other users' tasks - Return JSON responses only ======================== AGENTS & SKILLS ======================== SKILLS (agents/skills.py): - createTask(user_id, title, description) - listTasks(user_id, status="all") - completeTask(user_id, task_id) AGENTS (agents/agents.py): 1. Daily Task Agent - Auto-create default daily task if none exist today - Uses createTask, listTasks 2. Overdue Task Agent - Detect tasks past due_date or long-pending - Uses listTasks 3. Priority Agent - Suggest urgent/high-priority tasks - Uses listTasks - Detect keywords: urgent, important, asap 4. Recurring Task Agent - Auto-create repeating tasks (daily/weekly) - Uses createTask 5. Task Stats Agent - Return counts of completed, pending, overdue - Uses listTasks ======================== AGENT API ENDPOINTS ======================== (All require JWT) POST /api/agents/daily GET /api/agents/overdue GET /api/agents/priority POST /api/agents/recurring GET /api/agents/stats ======================== FRONTEND INTEGRATION ======================== - Backend must accept requests from Next.js frontend - JWT comes from frontend (Better Auth) - CORS enabled for http://localhost:3000 - All responses JSON-serializable ======================== QUALITY REQUIREMENTS ======================== - Clean code - Type hints - Error handling with HTTPException - Reusable dependencies - Production-ready structure ======================== OUTPUT EXPECTATION ======================== Generate ALL backend code files completely. Do not explain — only generate code."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and Manage Personal Tasks (Priority: P1)

A user wants to create, view, update, and delete their personal tasks through the web interface. They authenticate with Better Auth and can only see their own tasks.

**Why this priority**: This is the core functionality of a todo application - users need to be able to manage their tasks.

**Independent Test**: Can be fully tested by creating a task, viewing it, updating its status, and deleting it. Delivers the core value of task management.

**Acceptance Scenarios**:

1. **Given** user is authenticated, **When** user creates a new task, **Then** the task is saved to their account and visible only to them
2. **Given** user has existing tasks, **When** user requests their task list, **Then** they see only their own tasks
3. **Given** user has a task, **When** user updates the task, **Then** the changes are saved and only affect their task
4. **Given** user has a task, **When** user deletes the task, **Then** the task is removed from their account only

---

### User Story 2 - Use AI-Powered Task Agents (Priority: P2)

A user wants to leverage AI-powered agents to help manage their tasks, including creating daily tasks, identifying overdue items, and getting priority suggestions.

**Why this priority**: This adds intelligent automation to the core task management, enhancing user productivity.

**Independent Test**: Can be tested by triggering each agent endpoint and verifying it performs the intended action based on the user's tasks.

**Acceptance Scenarios**:

1. **Given** user has no tasks for today, **When** daily task agent is triggered, **Then** a default daily task is created for the user
2. **Given** user has overdue tasks, **When** overdue task agent is queried, **Then** the system returns the list of overdue tasks
3. **Given** user has tasks with priority keywords, **When** priority agent is queried, **Then** the system returns high-priority tasks

---

### User Story 3 - Track Task Statistics (Priority: P3)

A user wants to see statistics about their tasks, such as completed, pending, and overdue counts.

**Why this priority**: This provides valuable insights into task completion patterns and helps users stay organized.

**Independent Test**: Can be tested by querying the stats endpoint and verifying it returns accurate counts for the authenticated user.

**Acceptance Scenarios**:

1. **Given** user has various task statuses, **When** user requests task stats, **Then** the system returns accurate counts of completed, pending, and overdue tasks

---

### Edge Cases

- What happens when a user tries to access another user's task?
- How does the system handle expired JWT tokens?
- What happens when the database is temporarily unavailable?
- How does the system handle malformed requests?
- What happens when an agent encounters an error during execution?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify JWT tokens from Better Auth using BETTER_AUTH_SECRET
- **FR-002**: System MUST extract user_id from validated JWT tokens
- **FR-003**: System MUST reject unauthorized requests with 401 status code
- **FR-004**: System MUST enforce user isolation at the database level
- **FR-005**: Users MUST be able to create tasks with title, description, and optional due date
- **FR-006**: Users MUST be able to retrieve their own tasks only
- **FR-007**: Users MUST be able to update their own tasks
- **FR-008**: Users MUST be able to delete their own tasks
- **FR-009**: Users MUST be able to mark their tasks as complete/incomplete
- **FR-010**: System MUST provide endpoints for AI-powered task agents
- **FR-011**: System MUST support CORS for http://localhost:3000
- **FR-012**: System MUST store tasks in Neon Serverless PostgreSQL database
- **FR-013**: System MUST use SQLModel ORM for database operations
- **FR-014**: System MUST return JSON responses for all API endpoints
- **FR-015**: Daily Task Agent MUST create default daily tasks if none exist for today
- **FR-016**: Overdue Task Agent MUST detect tasks past due_date or long-pending
- **FR-017**: Priority Agent MUST identify tasks with keywords: urgent, important, asap
- **FR-018**: Recurring Task Agent MUST auto-create repeating tasks (daily/weekly)
- **FR-019**: Task Stats Agent MUST return counts of completed, pending, overdue tasks
- **FR-020**: System MUST use environment variables for configuration (NEON_DB_URL, BETTER_AUTH_SECRET)

### Key Entities *(include if feature involves data)*

- **Task**: Represents a user's task with id, user_id, title, description, completion status, timestamps, and optional due date
- **User**: Represents an authenticated user identified by user_id extracted from JWT
- **Agent**: Represents an AI-powered task management helper with specific behaviors (daily, overdue, priority, recurring, stats)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create, read, update, and delete their tasks with 99.9% success rate
- **SC-002**: System handles 1000 concurrent users without performance degradation
- **SC-003**: 95% of authenticated requests successfully validate JWT tokens
- **SC-004**: Users can only access their own tasks (0% cross-user data access)
- **SC-005**: All agent endpoints respond within 2 seconds under normal load
- **SC-006**: 90% of users successfully use at least one AI agent within first week of onboarding

## Constitutional Compliance *(mandatory)*

### Spec-First Verification

- [x] All requirements specified before implementation
- [x] Acceptance criteria clearly defined
- [x] Test scenarios documented

### Architecture Compliance

- [x] Adheres to Next.js 16+ (App Router) frontend
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