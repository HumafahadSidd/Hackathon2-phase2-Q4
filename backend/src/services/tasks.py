from typing import Optional
from sqlmodel import select
from uuid import UUID
from src.models.task import Task
from src.schemas.task import TaskCreate, TaskUpdate
from src.database import get_session
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TaskService:
    @staticmethod
    async def create_task(task_data: TaskCreate) -> Task:
        """Create a new task"""
        async with get_session() as session:
            # Create task from the validated data
            task = Task.model_validate(task_data)
            session.add(task)
            await session.commit()
            await session.refresh(task)

            logger.info(f"Task created with ID: {task.id}")
            return task

    @staticmethod
    async def get_task_by_id(task_id: UUID, user_id: UUID) -> Optional[Task]:
        """Get a specific task for a specific user"""
        async with get_session() as session:
            statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
            result = await session.execute(statement)
            task = result.first()
            return task

    @staticmethod
    async def get_tasks_by_user(user_id: UUID) -> list[Task]:
        """Get all tasks for a specific user"""
        async with get_session() as session:
            statement = select(Task).where(Task.user_id == user_id)
            result = await session.execute(statement)
            tasks = result.all()
            return tasks

    @staticmethod
    async def update_task(task_id: UUID, user_id: UUID, task_data: TaskUpdate) -> Optional[Task]:
        """Update a task for a specific user"""
        async with get_session() as session:
            statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
            result = await session.execute(statement)
            task = result.first()

            if not task:
                return None

            # Update task with new data
            update_data = task_data.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                if hasattr(task, key):
                    setattr(task, key, value)

            session.add(task)
            await session.commit()
            await session.refresh(task)

            logger.info(f"Task updated with ID: {task.id}")
            return task

    @staticmethod
    async def delete_task(task_id: UUID, user_id: UUID) -> bool:
        """Delete a specific task for a specific user"""
        async with get_session() as session:
            statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
            result = await session.execute(statement)
            task = result.first()

            if not task:
                return False

            await session.delete(task)
            await session.commit()

            logger.info(f"Task deleted with ID: {task.id}")
            return True

    @staticmethod
    async def update_task_completion(task_id: UUID, user_id: UUID, completed: bool) -> Optional[Task]:
        """Update the completion status of a specific task for a specific user"""
        async with get_session() as session:
            statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
            result = await session.execute(statement)
            task = result.first()

            if not task:
                return None

            task.completed = completed
            session.add(task)
            await session.commit()
            await session.refresh(task)

            logger.info(f"Task completion status updated for ID: {task.id}")
            return task