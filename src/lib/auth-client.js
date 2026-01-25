import { createAuthClient } from 'better-auth/react';

// Initialize the auth client with the API base URL
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});