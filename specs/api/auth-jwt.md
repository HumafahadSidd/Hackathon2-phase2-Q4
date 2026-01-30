# API Specification: JWT Authentication

## Purpose
Define the JWT format, handling, and verification process for the todo application. Ensure secure authentication and authorization across all API endpoints.

## Scope
- JWT format and structure
- Token lifetime and expiration
- Header requirements
- Verification process
- Error handling for authentication failures

## JWT Format
The JWT follows the standard format with three parts: header, payload, and signature.

### JWT Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### JWT Payload Claims
- `sub`: Subject (user ID) - Required
- `exp`: Expiration time (Unix timestamp) - Required
- `iat`: Issued at time (Unix timestamp) - Required
- `jti`: JWT ID (optional, for revocation tracking)

### Example JWT Payload
```json
{
  "sub": "user-12345",
  "exp": 1705823400,
  "iat": 1705737000,
  "jti": "jwt-abcde"
}
```

## Token Lifetime
- **Access Token**: 24 hours (86400 seconds) from issue time
- **Refresh Token**: 7 days (604800 seconds) from issue time
- Tokens automatically expire after their lifetime period
- Expired tokens are rejected by the verification process

## Header Requirements
- All API requests to protected endpoints must include the Authorization header
- Format: `Authorization: Bearer <JWT_TOKEN>`
- Case-sensitive header name and bearer prefix
- JWT token must be properly formatted (three parts separated by dots)

## Verification Process
1. Extract JWT from Authorization header
2. Verify JWT structure (three parts separated by dots)
3. Decode header and payload without verifying signature
4. Check that token hasn't expired (exp claim)
5. Verify JWT signature using shared secret
6. Extract user ID from subject (sub claim)
7. Validate user ID exists and is active in the system
8. Proceed with request using authenticated user context

## Verification Steps in Detail
1. **Format Check**: Ensure JWT has exactly 3 parts separated by dots
2. **Expiration Check**: Verify current time < exp claim
3. **Signature Verification**: Use HS256 algorithm with shared secret
4. **Subject Validation**: Ensure sub claim contains valid user ID
5. **User Status Check**: Verify user account is active and not suspended

## Error Cases
- `401 Unauthorized`: Missing Authorization header
- `401 Unauthorized`: Invalid JWT format (not 3 parts)
- `401 Unauthorized`: Invalid JWT signature
- `401 Unauthorized`: Expired JWT (exp < current time)
- `401 Unauthorized`: Invalid user ID in subject claim
- `401 Unauthorized`: Suspended or inactive user account

## Security Measures
- Use strong shared secret for signing (minimum 256 bits)
- Rotate shared secret periodically
- Store shared secret securely (environment variable or secure vault)
- Never log JWT tokens in application logs
- Implement rate limiting for authentication attempts
- Consider token blacklisting for compromised tokens

## Token Refresh
- When access token expires, client should initiate new authentication
- Better Auth handles token refresh automatically
- No manual token refresh endpoint needed in this application

## Integration with Better Auth
- JWTs issued by Better Auth service
- Shared secret configured in both Better Auth and backend
- Backend verifies JWTs issued by Better Auth
- User session management handled by Better Auth