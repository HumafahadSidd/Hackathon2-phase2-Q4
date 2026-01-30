from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session, select
from datetime import datetime

from db import engine
from models import Task, TaskCreate, TaskUpdate, TaskRead
from auth.jwt import get_current_user

router = APIRouter()


@router.get("/tasks", response_model=List[TaskRead])
def get_tasks(current_user_id: str = Depends(get_current_user)):
    """
    Retrieve all tasks for the authenticated user
    """
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == current_user_id)
        tasks = session.exec(statement).all()
        return tasks


@router.post("/tasks", response_model=TaskRead)
def create_task(task: TaskCreate, current_user_id: str = Depends(get_current_user)):
    """
    Create a new task for the authenticated user
    """
    with Session(engine) as session:
        db_task = Task.from_orm(task)
        db_task.user_id = current_user_id
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task


@router.get("/tasks/{task_id}", response_model=TaskRead)
def get_task(task_id: int, current_user_id: str = Depends(get_current_user)):
    """
    Retrieve a specific task by ID for the authenticated user
    """
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
        db_task = session.exec(statement).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        return db_task


@router.put("/tasks/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_update: TaskUpdate, current_user_id: str = Depends(get_current_user)):
    """
    Update a specific task by ID for the authenticated user
    """
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
        db_task = session.exec(statement).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        # Update task fields
        for field, value in task_update.dict(exclude_unset=True).items():
            setattr(db_task, field, value)
        
        db_task.updated_at = datetime.utcnow()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, current_user_id: str = Depends(get_current_user)):
    """
    Delete a specific task by ID for the authenticated user
    """
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
        db_task = session.exec(statement).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        session.delete(db_task)
        session.commit()
        return {"message": "Task deleted successfully"}


@router.patch("/tasks/{task_id}/complete")
def complete_task(task_id: int, current_user_id: str = Depends(get_current_user)):
    """
    Mark a specific task as complete/incomplete for the authenticated user
    """
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
        db_task = session.exec(statement).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        # Toggle completion status
        db_task.completed = not db_task.completed
        db_task.updated_at = datetime.utcnow()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return {"completed": db_task.completed}