# Research Findings: Full-Stack Todo Application Backend

**Feature**: Full-Stack Todo Application Backend
**Created**: 2026-01-23

## 1. Database Connection Research

### Decision: Neon Serverless PostgreSQL Connection Parameters
- Use standard PostgreSQL connection string format: `postgresql://username:password@ep-xxxx.region.provider.neon.tech/dbname?sslmode=require`
- Neon provides connection details in the dashboard after project creation
- Use environment variable `NEON_DB_URL` to store the connection string

### Rationale
Neon is PostgreSQL-compatible, so standard connection patterns apply. The connection string follows the PostgreSQL URI format with Neon-specific host and SSL requirements.

### Alternatives Considered
- Different connection pooling strategies: Decided to use SQLModel's default connection handling initially
- Alternative databases: PostgreSQL was specified in requirements

## 2. JWT Authentication Research

### Decision: Better Auth JWT Implementation
- Use python-jose library for JWT validation with BETTER_AUTH_SECRET
- Extract user_id from the `sub` claim in the JWT payload
- Use FastAPI's HTTPBearer for token extraction
- Store the secret in environment variables

### Rationale
python-jose is the recommended library for JWT handling in Python and integrates well with FastAPI. Better Auth follows standard JWT practices, so standard validation approaches work.

### Alternatives Considered
- PyJWT: Also valid but python-jose has better async support
- Manual token validation: More complex and error-prone

## 3. FastAPI Best Practices Research

### Decision: Dependency Injection for Authentication
- Use FastAPI's dependency system with HTTPBearer for JWT validation
- Create a `get_current_user` dependency that extracts user_id from token
- Apply this dependency to all protected endpoints

### Rationale
FastAPI's built-in security features provide clean authentication patterns and integrate well with the framework's validation and error handling.

### Alternatives Considered
- Manual header parsing: Would duplicate code across endpoints
- Third-party authentication libraries: Would add unnecessary complexity

## 4. Production Deployment Configuration

### Decision: Environment-Based Configuration
- Use python-dotenv for local development
- Support environment variables for production deployment
- Separate configuration for development, staging, and production

### Rationale
Environment variables are the standard approach for configuration in containerized applications and cloud deployments.

### Configuration Values
- `NEON_DB_URL`: Database connection string
- `BETTER_AUTH_SECRET`: JWT secret key
- `DEBUG`: Enable/disable debug mode
- `LOG_LEVEL`: Logging level (INFO, DEBUG, ERROR)