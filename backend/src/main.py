from fastapi import FastAPI
from src.database import engine
from src.models import create_db_and_tables
from src.api import router
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Import middleware
from src.middleware import cors, error_handler

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create DB tables on startup
    await create_db_and_tables()
    yield
    # Cleanup on shutdown if needed

app = FastAPI(
    title="Todo API",
    description="API for managing user tasks",
    version="1.0.0",
    lifespan=lifespan
)

# Include API routes
app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )