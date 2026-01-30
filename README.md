<<<<<<< HEAD
# ToDo App Frontend

This is the frontend for the ToDo application built with Next.js.

## Features

- User authentication and authorization
- Task management (Create, Read, Update, Delete, Complete)
=======
# Hackathon Todo Phase II – Full Stack Web Application

## Overview
This project transforms an existing console-based todo application into a modern, multi-user, full-stack web application using Next.js frontend, FastAPI backend, Neon PostgreSQL database, SQLModel ORM, and Better Auth with JWT authentication. The system enforces strict user data isolation and follows spec-driven development principles.

## Features
- User authentication and authorization
- Task management (Create, Read, Update, Delete, Complete)
- Multi-user support with data isolation
>>>>>>> 1de9837 (adding)
- Responsive web interface
- JWT-based session management

## Tech Stack
<<<<<<< HEAD

- **Frontend**: Next.js 16+ with App Router
- **Authentication**: Better Auth with JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start the development server: `npm run dev`

## Environment Variables

You need to set the following environment variable:

- `NEXT_PUBLIC_API_URL`: The URL of your backend API (defaults to http://localhost:8000)

## Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Creates a production build
- `npm run start`: Starts the production server
- `npm run lint`: Runs the linter

## Deployment

This application is ready to be deployed to platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.
=======
- **Frontend**: Next.js 16+ with App Router
- **Backend**: Python FastAPI
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel
- **Authentication**: Better Auth with JWT

## Architecture
The application follows a monorepo structure with separate backend and frontend directories:
```
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── api/
│   └── middleware/
├── alembic/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
└── requirements.txt

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── public/
├── tests/
│   ├── unit/
│   └── integration/
└── package.json
```

## Setup Instructions
1. Clone the repository
2. Install backend dependencies: `cd backend && pip install -r requirements.txt`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up environment variables (see `.env.example`)
5. Run database migrations
6. Start the backend: `cd backend && uvicorn src.main:app --reload`
7. Start the frontend: `cd frontend && npm run dev`

## Development Workflow
This project follows a spec-driven development approach using AI agents and specialized skills. All code is generated through AI agents following the specifications in the `specs/` directory.

## Contributing
Please follow the development workflow outlined in the specifications. All contributions must adhere to the constitutional principles defined in `.specify/memory/constitution.md`.

## License
[Specify license here]
>>>>>>> 1de9837 (adding)
