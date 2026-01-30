from fastapi import APIRouter, HTTPException, Body
from uuid import UUID
from typing import List
from src.services.tasks import TaskService
from src.schemas.task import TaskCreate, TaskRead, TaskUpdate
from src.models.task import Task

router = APIRouter()

@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=201)
async def create_task_for_user(user_id: UUID, task: TaskCreate):
    """Create a new task for a specific user"""
    # Override the user_id from the path parameter to ensure data integrity
    task_data = task.model_dump()
    task_data['user_id'] = user_id

    # Create the task
    created_task = await TaskService.create_task(TaskCreate(**task_data))
    return created_task

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
async def get_tasks_for_user(user_id: UUID):
    """Get all tasks for a specific user"""
    tasks = await TaskService.get_tasks_by_user(user_id)
    return tasks

@router.get("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def get_task_by_id(user_id: UUID, task_id: UUID):
    """Get a specific task by ID for a specific user"""
    task = await TaskService.get_task_by_id(task_id, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def update_task(user_id: UUID, task_id: UUID, task_update: TaskUpdate = Body(...)):
    """Update a specific task for a specific user"""
    updated_task = await TaskService.update_task(task_id, user_id, task_update)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@router.delete("/{user_id}/tasks/{task_id}", status_code=204)
async def delete_task(user_id: UUID, task_id: UUID):
    """Delete a specific task for a specific user"""
    success = await TaskService.delete_task(task_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
async def update_task_completion(user_id: UUID, task_id: UUID, completion_data: dict = Body(...)):
    """Mark a task as complete/incomplete for a specific user"""
    # Extract the completion status from the request body
    completed = completion_data.get("completed")

    if completed is None:
        raise HTTPException(status_code=400, detail="Missing 'completed' field in request body")

    updated_task = await TaskService.update_task_completion(task_id, user_id, completed)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task