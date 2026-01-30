from sqlmodel import create_engine
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database URL from environment variable
DATABASE_URL = os.getenv("NEON_DB_URL")

# Create engine
engine = create_engine(DATABASE_URL, echo=False)