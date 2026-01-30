from typing import List
from datetime import datetime, date, timedelta

from models import TaskRead
from .skills import createTask, listTasks, completeTask
from src.config import settings


class DailyTaskAgent:
    """
    Agent that auto-creates default daily task if none exist today
    """
    def __init__(self):
        pass
    
    def run(self, user_id: str) -> dict:
        # Get today's tasks
        today_tasks = listTasks(user_id, status="all")
        today = date.today()
        has_today_task = any(
            task.created_at.date() == today or 
            (task.due_date and task.due_date.date() == today)
            for task in today_tasks
        )
        
        if not has_today_task:
            # Create a default daily task
            task_title = f"Daily task for {today.strftime('%Y-%m-%d')}"
            task_description = "Default daily task created by the system"
            new_task = createTask(user_id, task_title, task_description)
            return {"message": "Daily task created", "task": new_task}
        else:
            return {"message": "Daily task already exists"}


class OverdueTaskAgent:
    """
    Agent that detects tasks past due_date or long-pending
    """
    def __init__(self):
        pass
    
    def run(self, user_id: str) -> dict:
        all_tasks = listTasks(user_id, status="all")
        overdue_tasks = []
        
        for task in all_tasks:
            if not task.completed and task.due_date and task.due_date < datetime.now():
                overdue_tasks.append(task)
        
        # Also include tasks that are pending for a long time (more than 30 days)
        thirty_days_ago = datetime.now() - timedelta(days=30)
        long_pending_tasks = [
            task for task in all_tasks
            if not task.completed and not task.due_date and task.created_at < thirty_days_ago
        ]
        
        return {
            "overdue_tasks": overdue_tasks,
            "long_pending_tasks": long_pending_tasks
        }


class PriorityAgent:
    """
    Agent that suggests urgent/high-priority tasks
    """
    def __init__(self):
        pass
    
    def run(self, user_id: str) -> dict:
        all_tasks = listTasks(user_id, status="all")
        priority_keywords = ["urgent", "important", "asap", "high priority", "critical"]
        
        priority_tasks = []
        for task in all_tasks:
            if task.completed:
                continue
                
            # Check title and description for priority keywords
            title_lower = task.title.lower()
            desc_lower = task.description.lower() if task.description else ""
            
            has_priority_keyword = any(
                keyword in title_lower or keyword in desc_lower
                for keyword in priority_keywords
            )
            
            # Also consider overdue tasks as high priority
            is_overdue = task.due_date and task.due_date < datetime.now()
            
            if has_priority_keyword or is_overdue:
                priority_tasks.append(task)
        
        return {"priority_tasks": priority_tasks}


class RecurringTaskAgent:
    """
    Agent that auto-creates repeating tasks (daily/weekly)
    """
    def __init__(self):
        pass
    
    def run(self, user_id: str) -> dict:
        # This is a simplified implementation
        # In a real system, you would have a way to define recurring tasks
        # For now, we'll just return a message indicating the feature
        
        # In a real implementation, you would:
        # 1. Query for recurring task definitions
        # 2. Check if today is a day to create the recurring task
        # 3. Create the task if needed
        
        return {"message": "Recurring task agent processed"}


class TaskStatsAgent:
    """
    Agent that returns counts of completed, pending, overdue tasks
    """
    def __init__(self):
        pass
    
    def run(self, user_id: str) -> dict:
        all_tasks = listTasks(user_id, status="all")
        
        completed_count = sum(1 for task in all_tasks if task.completed)
        pending_count = sum(1 for task in all_tasks if not task.completed)
        
        overdue_count = sum(
            1 for task in all_tasks
            if not task.completed and task.due_date and task.due_date < datetime.now()
        )
        
        return {
            "total": len(all_tasks),
            "completed": completed_count,
            "pending": pending_count,
            "overdue": overdue_count
        }

# Access the URL
hf_url = settings.HUGGINGFACE_API_URL
hf_token = settings.HUGGINGFACE_API_TOKEN