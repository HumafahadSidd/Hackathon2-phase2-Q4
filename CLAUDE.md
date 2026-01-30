# Claude Instructions for Hackathon Todo Phase II

## Project Overview
You are assisting with the development of a full-stack web application that transforms a console-based todo app into a modern, multi-user system. The application uses Next.js for the frontend, FastAPI for the backend, Neon PostgreSQL for the database, SQLModel as the ORM, and Better Auth with JWT for authentication.

## Tech Stack
- **Frontend**: Next.js 16+ with App Router
- **Backend**: Python FastAPI
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel
- **Authentication**: Better Auth with JWT

## Architecture
- Monorepo structure with separate `backend/` and `frontend/` directories
- API endpoints follow the pattern: `/api/{user_id}/tasks`
- Strict user data isolation enforced at the database and application layers
- JWT-based authentication with proper middleware

## Development Guidelines
- Follow the specifications in the `specs/` directory
- Adhere to the constitutional principles in `.specify/memory/constitution.md`
- Use AI agents and specialized skills as outlined in the documentation
- Maintain separation of concerns between frontend and backend
- Implement proper error handling and validation
- Follow security best practices for authentication and data access

## Key Files and Directories
- `specs/` - All specifications and requirements
- `backend/src/` - Backend source code
- `frontend/src/` - Frontend source code
- `.qwen/skills/` - AI agent skills for specialized development tasks

## Important Notes
- All user data must be properly isolated by user ID
- Authentication is required for all API endpoints
- Follow the API contract as specified in the documentation
- Use proper HTTP status codes and error responses
- Implement comprehensive validation on both frontend and backend