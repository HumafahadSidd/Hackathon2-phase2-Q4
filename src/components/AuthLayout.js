'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{
           backgroundImage: 'linear-gradient(135deg, #4F95DA 0%, #6B728E 100%)'
         }}>
      <div className="w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
            <FaCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLoginPage ? 'Welcome Back to DO IT' : 'Welcome to DO IT'}
          </h1>
          <p className="text-blue-100 mt-2">
            {isLoginPage ? 'Sign in to continue' : 'Create an account to get started'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <Link
              href="/login"
              className={`flex-1 text-center py-4 font-medium transition-all duration-300 ${
                isLoginPage
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.span>
            </Link>
            <Link
              href="/signup"
              className={`flex-1 text-center py-4 font-medium transition-all duration-300 ${
                isSignupPage
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.span>
            </Link>
          </div>

          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-blue-100">
          © {new Date().getFullYear()} DO IT App. All rights reserved.
        </div>
      </div>
    </div>
  );
}