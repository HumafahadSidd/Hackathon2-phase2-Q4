from pydantic import BaseModel, field_validator
from typing import Optional
from uuid import UUID
from datetime import datetime


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    user_id: UUID

    @field_validator('title')
    def validate_title(cls, v):
        if not 1 <= len(v) <= 255:
            raise ValueError('Title must be between 1 and 255 characters')
        return v

    @field_validator('description')
    def validate_description(cls, v):
        if v is not None and len(v) > 1000:
            raise ValueError('Description must be at most 1000 characters')
        return v


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    @field_validator('title')
    def validate_title(cls, v):
        if v is not None and not 1 <= len(v) <= 255:
            raise ValueError('Title must be between 1 and 255 characters')
        return v

    @field_validator('description')
    def validate_description(cls, v):
        if v is not None and len(v) > 1000:
            raise ValueError('Description must be at most 1000 characters')
        return v


class TaskRead(TaskBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True