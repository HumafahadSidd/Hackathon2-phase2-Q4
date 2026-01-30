'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First check if we have tokens in localStorage before calling the API
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
          // No token means definitely not authenticated
          setLoading(false);
          return;
        }

        const sessionData = await authClient.getSession();
        if (sessionData) {
          setSession(sessionData.session);
          setUser(sessionData.user);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens if session retrieval failed
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    // Use setTimeout to defer the initialization to avoid blocking the render
    const timer = setTimeout(() => {
      initializeAuth().catch(error => {
        console.error('Failed to initialize auth:', error);
        setLoading(false);
      });
    }, 0);

    // Cleanup function to clear the timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard'
      });

      if (response) {
        setSession(response.session);
        setUser(response.user);
        router.push('/dashboard');
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }, [router]);

  const signup = useCallback(async (email, password, name) => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name
      });

      if (response) {
        setSession(response.session);
        setUser(response.user);
        router.push('/dashboard');
        return { success: true };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setSession(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]);

  const value = useMemo(() => ({
    user,
    session,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  }), [user, session, login, signup, logout, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}