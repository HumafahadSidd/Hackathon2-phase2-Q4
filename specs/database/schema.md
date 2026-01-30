# Database Specification: Schema Design

## Purpose
Define the database schema for the todo application using Neon Serverless PostgreSQL with SQLModel. Ensure proper data modeling with user ownership and security constraints.

## Scope
- Database tables and relationships
- Field definitions and constraints
- Indexes for performance
- Foreign key relationships
- Ownership constraints for data isolation

## Database Engine
- **Engine**: Neon Serverless PostgreSQL
- **ORM**: SQLModel
- **Connection**: Connection pooling with SSL encryption
- **Migration**: SQLModel-based migration system

## Tables

### users Table
Stores user account information.

**Fields**:
- `id` (UUID, Primary Key, Not Null): Unique identifier for the user
- `email` (VARCHAR(255), Unique, Not Null): User's email address
- `username` (VARCHAR(50), Unique, Not Null): User's chosen username
- `password_hash` (VARCHAR(255), Not Null): Hashed password (managed by Better Auth)
- `created_at` (TIMESTAMP, Not Null): Account creation timestamp
- `updated_at` (TIMESTAMP, Not Null): Last update timestamp
- `is_active` (BOOLEAN, Not Null, Default: true): Account status

**Indexes**:
- Primary Key: `id`
- Unique Index: `email`
- Unique Index: `username`
- Regular Index: `is_active`

### tasks Table
Stores user tasks with ownership relationship.

**Fields**:
- `id` (UUID, Primary Key, Not Null): Unique identifier for the task
- `user_id` (UUID, Foreign Key, Not Null): Reference to the owning user
- `title` (VARCHAR(255), Not Null): Task title (1-255 characters)
- `description` (TEXT): Task description (0-1000 characters)
- `completed` (BOOLEAN, Not Null, Default: false): Completion status
- `created_at` (TIMESTAMP, Not Null): Task creation timestamp
- `updated_at` (TIMESTAMP, Not Null): Last update timestamp

**Indexes**:
- Primary Key: `id`
- Foreign Key Index: `user_id` (for joins and filtering)
- Regular Index: `completed` (for filtering completed tasks)
- Regular Index: `(user_id, completed)` (composite index for common queries)

**Foreign Key Constraints**:
- `user_id` references `users.id` with CASCADE delete
- Prevents orphaned tasks when users are deleted

**Ownership Constraints**:
- All queries must filter by `user_id` to enforce data isolation
- Users can only access tasks where `user_id` matches their ID
- Database-level constraint to prevent unauthorized access

## Relationships
- One-to-Many: `users` to `tasks` (one user can have many tasks)
- Foreign Key: `tasks.user_id` references `users.id`

## Indexes for Performance
1. **Primary Keys**: Automatically indexed for fast record lookup
2. **Unique Constraints**: Email and username uniqueness enforced
3. **Foreign Key Index**: Optimizes JOIN operations between users and tasks
4. **Filter Indexes**: Optimizes queries filtering by completion status
5. **Composite Index**: Optimizes common queries filtering by user and completion

## Data Integrity Constraints
- **Not Null Constraints**: Ensures required fields are always populated
- **Unique Constraints**: Prevents duplicate emails and usernames
- **Foreign Key Constraints**: Maintains referential integrity
- **Check Constraints**: Validates data format and range where applicable

## Ownership Enforcement
- Every query must include `WHERE user_id = ?` clause
- Backend enforces user ID matching between JWT and query
- Database triggers could be implemented for additional security
- Row Level Security (RLS) considerations for enhanced isolation

## Migration Strategy
- Use SQLModel's migration system for schema changes
- Maintain backward compatibility during migrations
- Backup database before applying migrations
- Test migrations in development environment first

## Security Considerations
- Encrypt sensitive data at rest where possible
- Use parameterized queries to prevent SQL injection
- Apply principle of least privilege for database connections
- Regular security audits of database access patterns