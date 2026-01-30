# Data Model: Hackathon Todo Phase II

## Overview
This document defines the data models for the Hackathon Todo Phase II application, based on the database schema specification and feature requirements.

## User Model
Represents a registered user in the system.

### Fields
- `id` (UUID, Primary Key): Unique identifier for the user
- `email` (VARCHAR(255), Unique, Not Null): User's email address
- `username` (VARCHAR(50), Unique, Not Null): User's chosen username
- `password_hash` (VARCHAR(255), Not Null): Hashed password (managed by Better Auth)
- `created_at` (TIMESTAMP, Not Null): Account creation timestamp
- `updated_at` (TIMESTAMP, Not Null): Last update timestamp
- `is_active` (BOOLEAN, Not Null, Default: true): Account status

### Relationships
- One-to-Many: User has many Tasks

### Validation Rules
- Email must be a valid email format
- Username must be 3-50 characters, alphanumeric and underscores only
- Password must be at least 8 characters (enforced by Better Auth)

## Task Model
Represents a task owned by a user.

### Fields
- `id` (UUID, Primary Key): Unique identifier for the task
- `user_id` (UUID, Foreign Key, Not Null): Reference to the owning user
- `title` (VARCHAR(255), Not Null): Task title (1-255 characters)
- `description` (TEXT): Task description (0-1000 characters)
- `completed` (BOOLEAN, Not Null, Default: false): Completion status
- `created_at` (TIMESTAMP, Not Null): Task creation timestamp
- `updated_at` (TIMESTAMP, Not Null): Last update timestamp

### Relationships
- Many-to-One: Task belongs to one User (user_id → users.id)

### Validation Rules
- Title must be 1-255 characters
- Description must be 0-1000 characters
- User_id must reference an existing, active user
- Only the owner can modify the task

### State Transitions
- `created` → `active` (automatically when created)
- `active` → `completed` (when user marks as complete)
- `completed` → `active` (when user unmarks as complete)

## Database Constraints
- Foreign Key: `tasks.user_id` references `users.id` with CASCADE delete
- Index: `users.email` (unique)
- Index: `users.username` (unique)
- Index: `tasks.user_id` (for efficient user-based queries)
- Index: `tasks.completed` (for efficient filtering)
- Composite Index: `(tasks.user_id, tasks.completed)` (for common user/completion queries)

## Data Access Patterns
1. Retrieve all tasks for a specific user
2. Retrieve a specific task for a specific user
3. Create a new task for a specific user
4. Update a specific task for a specific user
5. Delete a specific task for a specific user
6. Update completion status for a specific task for a specific user

## Security Considerations
- All queries must filter by `user_id` to enforce data isolation
- Backend must verify that authenticated user matches the task's `user_id`
- Direct database access should enforce user ownership
- No cross-user data access is permitted