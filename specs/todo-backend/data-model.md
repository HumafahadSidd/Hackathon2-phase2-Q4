# Data Model: Todo Application Backend

**Feature**: Full-Stack Todo Application Backend
**Created**: 2026-01-23

## Entities

### Task
Represents a user's task with associated metadata.

**Fields**:
- `id`: int (primary key, auto-generated)
- `user_id`: str (indexed, foreign key to user, extracted from JWT)
- `title`: str (required, 1-255 characters)
- `description`: str (optional, max 1000 characters)
- `completed`: bool (default false)
- `created_at`: datetime (auto-generated timestamp)
- `updated_at`: datetime (auto-generated timestamp, updated on changes)
- `due_date`: datetime (optional, future date)

**Relationships**:
- Belongs to a User (via user_id)

**Validation Rules**:
- Title must be 1-255 characters
- Description must be ≤ 1000 characters
- Due date must be in the future if provided
- User can only access their own tasks (enforced by user_id)

**State Transitions**:
- New task: `completed = false`
- Task completion: `completed = true`
- Task reopening: `completed = false`

## Indexes

### Task Table
- Primary key: `id`
- Index: `user_id` (for efficient user-based queries)
- Index: `completed` (for filtering completed/pending tasks)
- Index: `due_date` (for sorting and filtering by due date)

## Constraints

### Task Table
- `title` cannot be null or empty
- `user_id` cannot be null
- `created_at` must be before or equal to `updated_at`
- `due_date` must be in the future if provided