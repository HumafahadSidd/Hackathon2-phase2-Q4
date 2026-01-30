# Implementation Plan: Full Stack ToDo Application

## Summary

Transform an existing console-based todo application into a modern, multi-user, full-stack web application using Next.js frontend, FastAPI backend, Neon PostgreSQL database, SQLModel ORM, and Better Auth with JWT authentication. The system will enforce strict user data isolation and follow spec-driven development principles using AI agents and specialized skills.

## Technical Context

**Language/Version**: Python 3.11, JavaScript/TypeScript (Next.js 16+), PostgreSQL 15
**Primary Dependencies**: Next.js 16+, FastAPI, SQLModel, Neon Serverless PostgreSQL, Better Auth, JWT
**Storage**: Neon Serverless PostgreSQL with SQLModel ORM
**Testing**: pytest for backend, Jest/React Testing Library for frontend
**Target Platform**: Web application (responsive)
**Project Type**: Web application (monorepo with frontend/backend)
**Performance Goals**: <200ms p95 API response time, <3s page load time
**Constraints**: Multi-user data isolation, JWT-based authentication, spec-first development, AI agent usage
**Scale/Scope**: Up to 1000 concurrent users, 10,000 tasks per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Spec-First Development: All features must be specified before implementation
- [x] No Manual Coding: All code must be AI agent generated
- [x] Full-Stack Architecture: Adherence to Next.js/FastAPI/PostgreSQL/SQLModel/Better Auth stack
- [x] Security-First: Authentication/Authorization at every layer
- [x] Multi-User Isolation: Proper data ownership enforcement
- [x] API Contract Compliance: Strict adherence to defined endpoints
- [x] AI Agent and Skills Framework: Proper usage of specialized agents and skills

## Project Structure

### Documentation (this feature)

```text
specs/
├── overview.md
├── architecture.md
├── features/
│   ├── task-crud.md
│   └── authentication.md
├── api/
│   ├── rest-endpoints.md
│   └── auth-jwt.md
├── database/
│   └── schema.md
├── ui/
│   ├── pages.md
│   └── components.md
├── checklists/
│   └── requirements.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)

.qwen/
└── skills/
    └── nextjs/
        └── skill.md     # AI skill for Next.js development

.spec-kit/
└── config.yaml

.specify/
├── memory/
│   └── constitution.md
├── templates/
└── scripts/

.history/
└── prompts/
    ├── constitution/
    ├── general/
    └── todo-app/
```

**Structure Decision**: Web application monorepo with separate backend and frontend directories following the architecture specified in specs/architecture.md, with AI agent skills in .qwen/skills/

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (None) | (None) | (None) |

---

## PHASE 0 — Repository & Spec Infrastructure Setup

### Objective
Initialize the monorepo structure with proper folder organization, configuration files, and spec infrastructure to support the full-stack application development with AI agent skills.

### Steps
1. Create the backend directory structure: `backend/src/models`, `backend/src/services`, `backend/src/api`, `backend/src/middleware`
2. Create the frontend directory structure: `frontend/src/components`, `frontend/src/pages`, `frontend/src/services`, `frontend/src/hooks`, `frontend/src/utils`
3. Create the test directory structures: `backend/tests/unit`, `backend/tests/integration`, `backend/tests/contract`, `frontend/tests/unit`, `frontend/tests/integration`
4. Initialize backend requirements file with FastAPI, SQLModel, Neon driver, Better Auth dependencies
5. Initialize frontend package.json with Next.js, React, and authentication dependencies
6. Create the `.spec-kit/config.yaml` file referencing the existing configuration
7. Create the `.specify/memory/constitution.md` file referencing the existing constitution
8. Create the `specs/checklists/requirements.md` file referencing the existing checklist
9. Create the `history/prompts/todo-app/` directory structure for PHRs
10. Create root-level configuration files (`.gitignore`, `README.md`, `CLAUDE.md`)
11. Create the `.qwen/skills/` directory structure for AI agent skills
12. Create the `.qwen/skills/nextjs/skill.md` file with Next.js development expertise

### Files/Folders Touched
- `backend/` (directory)
- `frontend/` (directory)
- `backend/src/` (directory)
- `frontend/src/` (directory)
- `backend/tests/` (directory)
- `frontend/tests/` (directory)
- `backend/requirements.txt`
- `frontend/package.json`
- `.spec-kit/config.yaml`
- `.specify/memory/constitution.md`
- `specs/checklists/requirements.md`
- `history/prompts/todo-app/` (directory)
- `.gitignore`
- `README.md`
- `CLAUDE.md`
- `.qwen/skills/` (directory)
- `.qwen/skills/nextjs/` (directory)
- `.qwen/skills/nextjs/skill.md`

### Dependencies
- No previous phases required

### Success Criteria
- Directory structure matches the planned architecture
- Configuration files are properly initialized
- All spec files are accessible from the new structure
- Repository is ready for development
- AI agent skills are properly configured

### Spec References
@specs/architecture.md, @specs/overview.md, @specs/checklists/requirements.md, .specify/memory/constitution.md

---

## PHASE 1 — Backend Foundation (FastAPI + SQLModel + Neon)

### Objective
Set up the foundational backend infrastructure with FastAPI, SQLModel ORM, Neon PostgreSQL connection, and database models as specified in the schema.

### Steps
1. Create the main FastAPI application file `backend/src/main.py` with proper configuration
2. Create the database connection module `backend/src/database.py` with Neon connection setup
3. Create the SQLModel models in `backend/src/models/` based on `@specs/database/schema.md`
4. Implement the Alembic migration system in `backend/alembic/` with proper configuration
5. Create the initial database migration based on the schema
6. Set up the Pydantic models for request/response validation
7. Create the settings/configuration module with environment variable handling
8. Implement the startup/shutdown events for database connection management
9. Create the initial API router structure in `backend/src/api/`
10. Set up the basic middleware for CORS and error handling

### Files/Folders Touched
- `backend/src/main.py`
- `backend/src/database.py`
- `backend/src/models/__init__.py`
- `backend/src/models/user.py`
- `backend/src/models/task.py`
- `backend/src/schemas/__init__.py`
- `backend/src/schemas/user.py`
- `backend/src/schemas/task.py`
- `backend/src/config.py`
- `backend/src/middleware/__init__.py`
- `backend/src/middleware/auth.py`
- `backend/alembic/` (directory)
- `backend/alembic.ini`
- `backend/requirements.txt` (update)

### Dependencies
- Phase 0 completed

### Success Criteria
- FastAPI application starts without errors
- Database connection to Neon is established
- SQLModel models match the specified schema
- Alembic migrations are properly configured
- Basic API router is set up

### Spec References
@specs/database/schema.md, @specs/api/rest-endpoints.md, @specs/architecture.md

---

## PHASE 2 — Authentication System (Better Auth + JWT + Middleware)

### Objective
Implement the complete authentication system using Better Auth with JWT-based authentication and backend middleware for token verification.

### Steps
1. Install and configure Better Auth in the frontend with proper configuration
2. Set up the shared secret for JWT signing between frontend and backend
3. Create the authentication API endpoints in the backend
4. Implement JWT verification middleware in the backend
5. Create the user registration and login services in the backend
6. Implement the token refresh mechanism if needed
7. Create the authentication context in the frontend
8. Set up protected route handling in the frontend
9. Implement logout functionality in both frontend and backend
10. Add proper error handling for authentication failures

### Files/Folders Touched
- `frontend/src/lib/auth.js` (or appropriate auth setup)
- `frontend/src/context/AuthContext.js`
- `frontend/src/components/auth/LoginForm.jsx`
- `frontend/src/components/auth/SignupForm.jsx`
- `backend/src/api/auth.py`
- `backend/src/middleware/auth.py`
- `backend/src/services/auth.py`
- `backend/src/models/user.py` (update with auth fields)
- `frontend/package.json` (update with auth dependencies)
- `backend/requirements.txt` (update with auth dependencies)

### Dependencies
- Phase 1 completed

### Success Criteria
- Users can register and create accounts
- Users can log in and receive valid JWTs
- JWTs are properly verified by backend middleware
- Protected routes are enforced
- Authentication context is available throughout the app

### Spec References
@specs/features/authentication.md, @specs/api/auth-jwt.md, @specs/architecture.md

---

## PHASE 3 — Task API Implementation (CRUD + Ownership)

### Objective
Implement the complete task management API with full CRUD operations and strict user ownership enforcement.

### Steps
1. Create the task API endpoints in `backend/src/api/tasks.py` following the REST specification
2. Implement the task service layer in `backend/src/services/tasks.py` with business logic
3. Add user ownership verification to all task operations
4. Implement proper request/response validation using Pydantic models
5. Add comprehensive error handling for all task operations
6. Implement pagination, filtering, and sorting for task listings
7. Add proper HTTP status codes for all responses
8. Create contract tests for all task endpoints
9. Implement validation rules as specified in the feature specs
10. Add logging for task operations

### Files/Folders Touched
- `backend/src/api/tasks.py`
- `backend/src/services/tasks.py`
- `backend/src/schemas/task.py` (update with validation)
- `backend/tests/contract/test_tasks.py`
- `backend/tests/integration/test_tasks.py`
- `backend/src/middleware/auth.py` (update with ownership checks)

### Dependencies
- Phase 2 completed

### Success Criteria
- All task CRUD operations work correctly
- User ownership is enforced for all operations
- Proper error responses are returned
- Contract tests pass for all endpoints
- Validation rules are properly implemented

### Spec References
@specs/features/task-crud.md, @specs/api/rest-endpoints.md, @specs/database/schema.md

---

## PHASE 4 — Frontend Foundation (Next.js App Router + Layout + Auth UI)

### Objective
Set up the foundational frontend structure with Next.js App Router, layout components, and authentication UI.

### Steps
1. Initialize the Next.js project with App Router in the `frontend/` directory
2. Create the main layout structure in `frontend/src/app/layout.js`
3. Implement the header and navigation components
4. Create the authentication pages (login, signup) in `frontend/src/app/`
5. Set up the protected layout wrapper component
6. Implement the authentication context provider
7. Create the main dashboard page structure
8. Set up the routing configuration for protected routes
9. Create the basic UI components for authentication flows
10. Add proper error handling and loading states

### Files/Folders Touched
- `frontend/src/app/layout.js`
- `frontend/src/app/page.js`
- `frontend/src/app/login/page.js`
- `frontend/src/app/signup/page.js`
- `frontend/src/app/dashboard/page.js`
- `frontend/src/components/Header.jsx`
- `frontend/src/components/ProtectedLayout.jsx`
- `frontend/src/context/AuthContext.js`
- `frontend/src/components/auth/LoginForm.jsx`
- `frontend/src/components/auth/SignupForm.jsx`

### Dependencies
- Phase 2 completed

### Success Criteria
- Next.js app starts without errors
- Layout structure is properly implemented
- Authentication pages are accessible
- Protected routes are properly handled
- Authentication context is working

### Spec References
@specs/ui/pages.md, @specs/features/authentication.md, @specs/architecture.md

---

## PHASE 5 — Frontend Task UI (Pages + Components + API Client)

### Objective
Implement the complete frontend UI for task management with pages, reusable components, and API client integration.

### Steps
1. Create the task list page in `frontend/src/app/dashboard/page.js`
2. Implement the task detail page in `frontend/src/app/tasks/[id]/page.js`
3. Create the reusable task components (TaskItem, TaskForm, etc.)
4. Implement the API client service for communicating with backend
5. Add proper loading and error states to all components
6. Create the task creation and editing forms
7. Implement the task completion toggle functionality
8. Add filtering and sorting capabilities to the task list
9. Create the task deletion confirmation modal
10. Implement optimistic updates for better UX

### Files/Folders Touched
- `frontend/src/app/dashboard/page.js`
- `frontend/src/app/tasks/[id]/page.js`
- `frontend/src/components/TaskList.jsx`
- `frontend/src/components/TaskItem.jsx`
- `frontend/src/components/TaskForm.jsx`
- `frontend/src/components/TaskModal.jsx`
- `frontend/src/services/api.js`
- `frontend/src/hooks/useTasks.js`
- `frontend/src/components/ProtectedLayout.jsx` (update with task UI)
- `frontend/src/app/globals.css` (update with task styles)

### Dependencies
- Phase 4 completed
- Phase 3 completed

### Success Criteria
- Task list page displays user's tasks correctly
- Task detail page shows individual task information
- Users can create, update, and delete tasks
- Task completion toggle works properly
- API client properly handles authentication headers

### Spec References
@specs/ui/components.md, @specs/ui/pages.md, @specs/features/task-crud.md

---

## PHASE 6 — Full Stack Integration (JWT passing + E2E flows)

### Objective
Integrate the frontend and backend systems to create seamless end-to-end user flows with proper JWT handling.

### Steps
1. Configure the frontend API client to automatically include JWTs in requests
2. Implement proper error handling for authentication failures
3. Create end-to-end tests for all user flows
4. Implement proper session management and token refresh
5. Add loading states and error boundaries throughout the app
6. Integrate the frontend with all backend API endpoints
7. Implement proper form validation and error display
8. Add proper navigation after successful operations
9. Create a unified error handling system
10. Test all user flows from authentication to task management

### Files/Folders Touched
- `frontend/src/services/api.js` (update with JWT handling)
- `frontend/src/middleware.js` (Next.js middleware for auth)
- `frontend/tests/e2e/` (new directory)
- `frontend/tests/e2e/auth-flow.test.js`
- `frontend/tests/e2e/task-flow.test.js`
- `frontend/src/components/ErrorBoundary.jsx`
- `frontend/src/hooks/useAuth.js`
- `frontend/src/utils/errorHandler.js`
- `frontend/src/app/dashboard/page.js` (integrate with API)
- `frontend/src/app/tasks/[id]/page.js` (integrate with API)

### Dependencies
- Phase 5 completed
- Phase 3 completed

### Success Criteria
- JWTs are properly passed between frontend and backend
- All user flows work seamlessly from start to finish
- End-to-end tests pass successfully
- Error handling works properly across the application
- Session management is robust

### Spec References
@specs/architecture.md, @specs/api/rest-endpoints.md, @specs/features/authentication.md

---

## PHASE 7 — Hardening, Security & Validation

### Objective
Strengthen the application with security measures, validation, and edge case handling.

### Steps
1. Add comprehensive input validation on both frontend and backend
2. Implement rate limiting for authentication endpoints
3. Add CSRF protection mechanisms
4. Implement proper logging and monitoring
5. Add security headers to API responses
6. Conduct security review of authentication flow
7. Add data sanitization for user inputs
8. Implement proper error masking to avoid information leakage
9. Add comprehensive edge case testing
10. Perform security scanning and vulnerability assessment

### Files/Folders Touched
- `backend/src/middleware/security.py`
- `backend/src/utils/validation.py`
- `backend/src/utils/sanitization.py`
- `backend/src/api/auth.py` (update with rate limiting)
- `backend/src/main.py` (update with security headers)
- `frontend/src/utils/validation.js`
- `frontend/src/services/api.js` (update with security measures)
- `backend/tests/unit/test_security.py`
- `backend/tests/unit/test_validation.py`
- `frontend/tests/unit/test_validation.js`

### Dependencies
- Phase 6 completed

### Success Criteria
- Input validation is comprehensive on both sides
- Security measures are properly implemented
- Error handling masks sensitive information
- Rate limiting is in place for sensitive endpoints
- All edge cases are handled properly

### Spec References
@specs/features/authentication.md, @specs/api/auth-jwt.md, @specs/features/task-crud.md

---

## PHASE 8 — Spec Compliance Audit (Using specs/checklists/requirements.md)

### Objective
Verify that the complete implementation complies with all specifications and constitutional requirements, including proper usage of AI agents and skills.

### Steps
1. Conduct a comprehensive review against all specification documents
2. Verify that all constitutional principles are implemented
3. Check that all API endpoints match the specified contracts
4. Validate that user data isolation is properly enforced
5. Confirm that all user stories from feature specs are implemented
6. Verify that all architectural requirements are met
7. Test all edge cases mentioned in specifications
8. Validate that no manual coding was performed
9. Confirm that all database schema requirements are met
10. Document any deviations and create remediation plan
11. Verify proper usage of AI agents and specialized skills
12. Confirm that Next.js development followed the defined skill guidelines

### Files/Folders Touched
- All files in the project
- `specs/checklists/requirements.md` (update with audit results)
- `docs/compliance-report.md` (new file)
- `specs/audit-findings.md` (new file)
- `.qwen/skills/nextjs/skill.md` (review for compliance)

### Dependencies
- All previous phases completed

### Success Criteria
- All specifications are fully implemented
- Constitutional principles are adhered to
- No manual coding violations found
- All API contracts match specifications
- User data isolation is verified
- Proper AI agent and skill usage confirmed
- Next.js development followed skill guidelines

### Spec References
@specs/checklists/requirements.md, @specs/overview.md, @specs/architecture.md, @specs/features/task-crud.md, @specs/features/authentication.md, @specs/api/rest-endpoints.md, @specs/api/auth-jwt.md, @specs/database/schema.md, @specs/ui/pages.md, @specs/ui/components.md, .specify/memory/constitution.md, .qwen/skills/nextjs/skill.md

---

## Backend Architecture (FastAPI, Neon DB)

### FastAPI Architecture
- **Application Structure**: Using FastAPI with dependency injection and async support
- **Router Organization**: Modular routers for different functionalities (auth, tasks, users)
- **Middleware**: Authentication, CORS, error handling, and security middleware
- **Pydantic Models**: Request/response validation using Pydantic schemas
- **Exception Handling**: Custom exception handlers for consistent error responses
- **Event Handlers**: Startup/shutdown events for database connection management

### Neon Database Integration
- **Connection Pooling**: Efficient connection management with Neon's serverless features
- **SQLModel ORM**: Combining SQLAlchemy and Pydantic for type-safe database operations
- **Alembic Migrations**: Automated migration system for schema evolution
- **Async Support**: Leveraging async database operations for better performance
- **Environment Configuration**: Secure configuration management for database URLs

### API Routes
- **Authentication Routes**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login
  - `POST /auth/logout` - User logout
- **Task Management Routes**:
  - `GET /api/{user_id}/tasks` - Get all tasks for a user
  - `POST /api/{user_id}/tasks` - Create a new task for a user
  - `GET /api/{user_id}/tasks/{id}` - Get a specific task for a user
  - `PUT /api/{user_id}/tasks/{id}` - Update a specific task for a user
  - `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task for a user
  - `PATCH /api/{user_id}/tasks/{id}/complete` - Update task completion status

---

## Auth Flow with Better Auth

### Better Auth Integration
- **Frontend Setup**: Initialize Better Auth client in Next.js application
- **JWT Generation**: Better Auth generates JWTs upon successful authentication
- **Session Management**: Secure storage and management of authentication tokens
- **User Profiles**: Integration with Better Auth's user profile management

### Authentication Flow
1. **Registration**: User provides email, username, and password
2. **Verification**: Better Auth validates credentials and creates account
3. **JWT Issuance**: Better Auth generates JWT with user identity claims
4. **Storage**: JWT securely stored in browser (localStorage or secure cookies)
5. **API Requests**: JWT automatically included in Authorization header
6. **Backend Verification**: Backend verifies JWT signature and validity
7. **User Context**: Extract user ID from JWT for ownership verification
8. **Session Management**: Handle token expiration and refresh

### Security Measures
- **Token Validation**: Backend validates JWT signature and expiration
- **User Isolation**: Enforce user ID matching between JWT and request
- **Secure Storage**: Proper storage of tokens in frontend
- **CSRF Protection**: Additional security headers where needed

---

## Agent Execution Flow

### AI Agent Selection
- **NextJS Builder**: For Next.js frontend development tasks
- **Specification Agent**: For creating comprehensive technical specifications
- **Spec Auditor**: For compliance and security audits
- **Project Planner**: For creating comprehensive project plans
- **Task Decomposer**: For breaking down complex projects into executable tasks
- **JWT Security Auditor**: For auditing JWT authentication flows

### Agent Workflow
1. **Specification Creation**: Use specification-agent to define features and requirements
2. **Planning**: Use project-planner to create implementation plans
3. **Task Generation**: Use task-decomposer to break plans into executable tasks
4. **Implementation**: Use appropriate agents (nextjs-builder, etc.) for coding
5. **Auditing**: Use spec-auditor and jwt-security-auditor for compliance checks
6. **Review**: Use constitution-agent for governance and policy compliance

### Skills Framework
- **Next.js Skill**: Enhanced guidance for Next.js development in `.qwen/skills/nextjs/skill.md`
- **Best Practices**: Incorporation of industry best practices into agent skills
- **Consistency**: Ensuring consistent implementation patterns across the codebase

---

## Frontend ↔ Backend Integration

### API Communication Layer
- **Client Service**: Centralized API client in frontend for backend communication
- **Authentication Headers**: Automatic inclusion of JWTs in all requests
- **Error Handling**: Consistent error handling between frontend and backend
- **Data Transformation**: Proper serialization/deserialization of data

### Data Flow
1. **User Interaction**: User performs action in frontend UI
2. **Request Formation**: Frontend forms authenticated request to backend
3. **Backend Processing**: Backend verifies JWT and processes request
4. **Database Operation**: Backend performs user-isolated database operation
5. **Response Formation**: Backend forms response with appropriate data
6. **UI Update**: Frontend receives response and updates UI accordingly

### Real-time Updates
- **Optimistic Updates**: UI updates before server confirmation for better UX
- **WebSocket Integration**: Optional real-time updates if needed
- **Polling Mechanisms**: Fallback for real-time data synchronization

---

## Folder Structure

### Backend Structure
```
backend/
├── src/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration and settings
│   ├── database.py             # Database connection and session management
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth.py             # Authentication middleware
│   │   └── security.py         # Security middleware
│   ├── models/                 # SQLModel database models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/                # Pydantic request/response models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── api/                    # API route definitions
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── tasks.py
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── tasks.py
│   └── utils/                  # Utility functions
│       ├── __init__.py
│       ├── validation.py
│       └── security.py
├── alembic/                    # Database migrations
│   ├── versions/
│   └── env.py
├── alembic.ini
├── requirements.txt
└── tests/                      # Backend tests
    ├── unit/
    ├── integration/
    └── contract/
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Home page
│   │   ├── login/page.js       # Login page
│   │   ├── signup/page.js      # Signup page
│   │   ├── dashboard/page.js   # Dashboard page
│   │   └── tasks/[id]/page.js  # Task detail page
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskForm.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   └── ui/                 # Base UI components
│   │       ├── Button.jsx
│   │       ├── InputField.jsx
│   │       └── Modal.jsx
│   ├── context/                # React context providers
│   │   └── AuthContext.js
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useTasks.js
│   ├── services/               # API clients and services
│   │   └── api.js
│   ├── lib/                    # Utility libraries
│   │   └── auth.js
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   └── utils/                  # Utility functions
│       └── validation.js
├── public/                     # Static assets
├── package.json
├── next.config.js
├── .env.local
└── tests/                      # Frontend tests
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## Data Models

### User Model
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the user
  - `email` (VARCHAR(255), Unique, Not Null): User's email address
  - `username` (VARCHAR(50), Unique, Not Null): User's chosen username
  - `password_hash` (VARCHAR(255), Not Null): Hashed password (managed by Better Auth)
  - `created_at` (TIMESTAMP, Not Null): Account creation timestamp
  - `updated_at` (TIMESTAMP, Not Null): Last update timestamp
  - `is_active` (BOOLEAN, Not Null, Default: true): Account status
- **Relationships**: One-to-Many with Task model
- **Validation**: Email format, username length and format, password strength

### Task Model
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the task
  - `user_id` (UUID, Foreign Key, Not Null): Reference to the owning user
  - `title` (VARCHAR(255), Not Null): Task title (1-255 characters)
  - `description` (TEXT): Task description (0-1000 characters)
  - `completed` (BOOLEAN, Not Null, Default: false): Completion status
  - `created_at` (TIMESTAMP, Not Null): Task creation timestamp
  - `updated_at` (TIMESTAMP, Not Null): Last update timestamp
- **Relationships**: Many-to-One with User model
- **Validation**: Title length, description length, user_id existence
- **State Transitions**: active ↔ completed

### Security & Ownership
- **Enforcement**: All database queries must filter by user_id
- **Middleware**: Backend verifies authenticated user matches requested user_id
- **Constraints**: Foreign key relationships enforce referential integrity
- **Access Control**: Row-level security prevents unauthorized access