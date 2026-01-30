# Agent API Contract

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

### POST /agents/daily
Run the daily task agent to create a default daily task if none exist for today.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: Agent executed successfully
```json
{
  "message": "Daily task created",
  "task": {
    "id": 1,
    "user_id": "user123",
    "title": "Daily task for 2023-01-01",
    "description": "Default daily task created by the system",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z",
    "due_date": null
  }
}
```
OR
```json
{
  "message": "Daily task already exists"
}
```

### GET /agents/overdue
Get a list of overdue tasks for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: List of overdue tasks
```json
{
  "overdue_tasks": [
    {
      "id": 1,
      "user_id": "user123",
      "title": "Overdue task",
      "description": "Task that was due yesterday",
      "completed": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      "due_date": "2023-01-02T00:00:00Z"
    }
  ],
  "long_pending_tasks": [
    {
      "id": 2,
      "user_id": "user123",
      "title": "Long pending task",
      "description": "Task that has been pending for 30+ days",
      "completed": false,
      "created_at": "2022-12-01T00:00:00Z",
      "updated_at": "2022-12-01T00:00:00Z",
      "due_date": null
    }
  ]
}
```

### GET /agents/priority
Get a list of priority tasks for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: List of priority tasks
```json
{
  "priority_tasks": [
    {
      "id": 1,
      "user_id": "user123",
      "title": "URGENT: Important task",
      "description": "This task is marked as urgent",
      "completed": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      "due_date": "2023-01-02T00:00:00Z"
    }
  ]
}
```

### POST /agents/recurring
Run the recurring task agent to create scheduled recurring tasks.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: Agent executed successfully
```json
{
  "message": "Recurring task agent processed"
}
```

### GET /agents/stats
Get task statistics for the authenticated user.

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
- `200 OK`: Task statistics
```json
{
  "total": 10,
  "completed": 6,
  "pending": 3,
  "overdue": 1
}
```