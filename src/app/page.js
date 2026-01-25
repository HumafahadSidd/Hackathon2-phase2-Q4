'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to ensure client-side rendering
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only redirect after component is mounted and loading is complete
    if (isMounted && !loading) {
      if (isAuthenticated) {
        router.replace('/dashboard'); // Use replace to avoid back button issues
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, loading, router, isMounted]);

  // Show a minimal loading state while determining auth status
  // If not mounted yet, don't show anything to avoid hydration issues
  if (!isMounted) {
    return null; // Render nothing until component is mounted
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the ToDo App</h1>
        <p className="text-lg text-gray-600">Checking authentication status...</p>
        <div className="mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}