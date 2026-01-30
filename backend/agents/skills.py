from sqlmodel import Session, select
from datetime import datetime
from typing import List, Optional

from db import engine
from models import Task, TaskRead


def createTask(user_id: str, title: str, description: Optional[str] = None) -> TaskRead:
    """
    Create a new task for the specified user
    """
    from models import Task as TaskModel
    
    with Session(engine) as session:
        task = TaskModel(
            user_id=user_id,
            title=title,
            description=description,
            completed=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        return TaskRead.from_orm(task)


def listTasks(user_id: str, status: str = "all") -> List[TaskRead]:
    """
    List tasks for the specified user based on status
    Status options: "all", "completed", "pending"
    """
    from models import Task as TaskModel
    
    with Session(engine) as session:
        statement = select(TaskModel).where(TaskModel.user_id == user_id)
        
        if status == "completed":
            statement = statement.where(TaskModel.completed == True)
        elif status == "pending":
            statement = statement.where(TaskModel.completed == False)
        # For "all", no additional filtering is needed
        
        tasks = session.exec(statement).all()
        return [TaskRead.from_orm(task) for task in tasks]


def completeTask(user_id: str, task_id: int) -> bool:
    """
    Mark a task as completed for the specified user
    """
    from models import Task as TaskModel
    
    with Session(engine) as session:
        statement = select(TaskModel).where(
            TaskModel.id == task_id,
            TaskModel.user_id == user_id
        )
        task = session.exec(statement).first()
        
        if not task:
            return False  # Task not found or doesn't belong to user
        
        task.completed = True
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        return True