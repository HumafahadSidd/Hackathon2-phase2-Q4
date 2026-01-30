# Quickstart Guide: Todo Application Backend

## Prerequisites
- Python 3.9+
- pip package manager
- Access to Neon Serverless PostgreSQL
- Better Auth account for JWT secrets

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd todo-app/backend
```

### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```bash
# Database URL for Neon Serverless PostgreSQL
NEON_DB_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Secret key for JWT token verification (Better Auth)
BETTER_AUTH_SECRET=your_better_auth_secret_here
```

### 5. Run the application
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Usage

### Authentication
All API endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Task Operations

#### Create a task
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample task",
    "description": "Task description",
    "due_date": "2023-12-31T23:59:59Z"
  }'
```

#### Get all tasks
```bash
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Update a task
```bash
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task",
    "completed": true
  }'
```

#### Delete a task
```bash
curl -X DELETE http://localhost:8000/api/tasks/1 \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Agent Operations

#### Run daily task agent
```bash
curl -X POST http://localhost:8000/api/agents/daily \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Get overdue tasks
```bash
curl -X GET http://localhost:8000/api/agents/overdue \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Get priority tasks
```bash
curl -X GET http://localhost:8000/api/agents/priority \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Get task statistics
```bash
curl -X GET http://localhost:8000/api/agents/stats \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Development

### Running tests
```bash
pytest
```

### Running with auto-reload
```bash
uvicorn main:app --reload
```

### Generating documentation
The API documentation is automatically available at `http://localhost:8000/docs` when running in development mode.