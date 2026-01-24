# ToDo App Frontend

This is the frontend for the ToDo application built with Next.js.

## Features

- User authentication and authorization
- Task management (Create, Read, Update, Delete, Complete)
- Responsive web interface
- JWT-based session management

## Tech Stack

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