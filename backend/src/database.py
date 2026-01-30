from sqlmodel import create_engine, SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost/dbname")

# Create async engine
engine = create_async_engine(DATABASE_URL)

# Create async session
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def create_db_and_tables():
    """Create database tables"""
    async with engine.begin() as conn:
        # Create all tables defined in models
        await conn.run_sync(SQLModel.metadata.create_all)

@asynccontextmanager
async def get_session():
    """Get database session"""
    async with AsyncSessionLocal() as session:
        yield session