# Task API Contract

## Base URL
`/api`

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Invalid or missing tokens will result in a 401 Unauthorized response.

## Common Response Format
Successful responses follow this pattern:
```json
{
  "success": true,
  "data": { ... }
}
```

Error responses follow this pattern:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### GET /tasks
Retrieve all tasks for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: List of tasks
```json
[
  {
    "id": 1,
    "user_id": "user123",
    "title": "Sample task",
    "description": "Task description",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z",
    "due_date": "2023-01-02T00:00:00Z"
  }
]
```

### POST /tasks
Create a new task for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "New task",
  "description": "Task description",
  "due_date": "2023-01-02T00:00:00Z"
}
```

**Response**:
- `201 Created`: Task created successfully
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z",
  "due_date": "2023-01-02T00:00:00Z"
}
```

### GET /tasks/{id}
Retrieve a specific task by ID.

**Headers**:
- `Authorization: Bearer <token>`

**Parameters**:
- `id`: Task ID (path parameter)

**Response**:
- `200 OK`: Task found
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Sample task",
  "description": "Task description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z",
  "due_date": "2023-01-02T00:00:00Z"
}
```
- `404 Not Found`: Task not found or doesn't belong to user

### PUT /tasks/{id}
Update a specific task by ID.

**Headers**:
- `Authorization: Bearer <token>`

**Parameters**:
- `id`: Task ID (path parameter)

**Request Body**:
```json
{
  "title": "Updated task",
  "description": "Updated description",
  "due_date": "2023-01-03T00:00:00Z",
  "completed": true
}
```

**Response**:
- `200 OK`: Task updated successfully
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Updated task",
  "description": "Updated description",
  "completed": true,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-02T00:00:00Z",
  "due_date": "2023-01-03T00:00:00Z"
}
```
- `404 Not Found`: Task not found or doesn't belong to user

### DELETE /tasks/{id}
Delete a specific task by ID.

**Headers**:
- `Authorization: Bearer <token>`

**Parameters**:
- `id`: Task ID (path parameter)

**Response**:
- `200 OK`: Task deleted successfully
```json
{
  "message": "Task deleted successfully"
}
```
- `404 Not Found`: Task not found or doesn't belong to user

### PATCH /tasks/{id}/complete
Toggle the completion status of a specific task.

**Headers**:
- `Authorization: Bearer <token>`

**Parameters**:
- `id`: Task ID (path parameter)

**Response**:
- `200 OK`: Task completion status updated
```json
{
  "completed": true
}
```
- `404 Not Found`: Task not found or doesn't belong to user