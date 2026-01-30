from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql+asyncpg://username:password@localhost/dbname"
    
    # JWT settings
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Better Auth settings
    BETTER_AUTH_SECRET: str = "your-better-auth-secret"
    
    # Other settings
    PROJECT_NAME: str = "Todo API"
    API_V1_STR: str = "/api/v1"
    
    # Hugging Face settings
    HUGGINGFACE_API_URL: str = ""
    HUGGINGFACE_API_TOKEN: str = ""
    
    class Config:
        env_file = ".env"


settings = Settings()