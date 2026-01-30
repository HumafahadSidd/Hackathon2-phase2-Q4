from fastapi import APIRouter
from . import tasks, auth

router = APIRouter()

# Include task routes
router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

# Include auth routes
router.include_router(auth.router, prefix="/auth", tags=["auth"])