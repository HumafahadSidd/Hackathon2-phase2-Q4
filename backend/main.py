from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from db import engine
from models import Task
from routes import tasks, agents

# Load environment variables
load_dotenv()

# Create tables
from sqlmodel import SQLModel
SQLModel.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="Todo App Backend", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router, prefix="/api", tags=["tasks"])
app.include_router(agents.router, prefix="/api", tags=["agents"])

@app.get("/")
def read_root():
    return {"message": "Todo App Backend API"}