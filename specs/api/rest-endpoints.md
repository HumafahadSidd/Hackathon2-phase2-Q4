# API Specification: REST Endpoints

## Purpose
Define the complete REST API for the todo application, including all endpoints, request/response models, authentication requirements, and error handling.

## Scope
- All REST endpoints for task management
- Authentication and authorization requirements
- Request/response models
- Error handling and status codes
- Ownership enforcement

## Base URL
All API endpoints are prefixed with `/api`.

## Common Headers
- `Authorization: Bearer <JWT_TOKEN>` - Required for all endpoints
- `Content-Type: application/json` - For POST/PUT/PATCH requests

## Endpoints

### GET /api/{user_id}/tasks
Retrieve all tasks for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**: 
- `user_id` (path): User ID from JWT must match this value

**Response**:
- `200 OK`: Array of task objects
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID
- `404 Not Found`: User ID doesn't exist

**Response Model**:
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### POST /api/{user_id}/tasks
Create a new task for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**:
- `user_id` (path): User ID from JWT must match this value

**Request Body**:
```json
{
  "title": "string (required, 1-255 chars)",
  "description": "string (optional, 0-1000 chars)",
  "completed": "boolean (optional, default false)"
}
```

**Response**:
- `201 Created`: Created task object
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID

**Response Model**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### GET /api/{user_id}/tasks/{id}
Retrieve a specific task for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**:
- `user_id` (path): User ID from JWT must match this value
- `id` (path): Task ID to retrieve

**Response**:
- `200 OK`: Task object
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID
- `404 Not Found`: Task doesn't exist or doesn't belong to user

**Response Model**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### PUT /api/{user_id}/tasks/{id}
Update a specific task for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**:
- `user_id` (path): User ID from JWT must match this value
- `id` (path): Task ID to update

**Request Body**:
```json
{
  "title": "string (required, 1-255 chars)",
  "description": "string (optional, 0-1000 chars)",
  "completed": "boolean"
}
```

**Response**:
- `200 OK`: Updated task object
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID
- `404 Not Found`: Task doesn't exist or doesn't belong to user

**Response Model**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### DELETE /api/{user_id}/tasks/{id}
Delete a specific task for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**:
- `user_id` (path): User ID from JWT must match this value
- `id` (path): Task ID to delete

**Response**:
- `204 No Content`: Task successfully deleted
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID
- `404 Not Found`: Task doesn't exist or doesn't belong to user

### PATCH /api/{user_id}/tasks/{id}/complete
Mark a specific task as complete/incomplete for the specified user.

**Authentication**: Required - Valid JWT with matching user ID
**Parameters**:
- `user_id` (path): User ID from JWT must match this value
- `id` (path): Task ID to update
- `completed` (body): Boolean indicating completion status

**Request Body**:
```json
{
  "completed": "boolean"
}
```

**Response**:
- `200 OK`: Updated task object
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: JWT user ID doesn't match path user ID
- `404 Not Found`: Task doesn't exist or doesn't belong to user

**Response Model**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Authentication Requirements
- All endpoints require a valid JWT in the Authorization header
- JWT must contain a user ID that matches the user_id path parameter
- Requests with mismatched user IDs will be rejected with 403 Forbidden

## Error Cases
- `400 Bad Request`: Malformed request body or invalid parameters
- `401 Unauthorized`: Missing or invalid JWT
- `403 Forbidden`: User ID in JWT doesn't match user_id in path
- `404 Not Found`: Resource doesn't exist or doesn't belong to user
- `409 Conflict`: Attempt to create duplicate resource
- `500 Internal Server Error`: Unexpected server error

## Ownership Enforcement
- All operations are restricted to the authenticated user's data
- Backend verifies that user_id in JWT matches user_id in path
- Database queries are filtered by user_id to prevent unauthorized access
- Access to tasks owned by other users is denied with 403 Forbidden