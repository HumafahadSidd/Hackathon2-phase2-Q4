'use client';

import React from 'react';
import { FaEnvelope, FaLock, FaUser, FaApple, FaGoogle, FaCheck } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';

const AuthForms = () => {
  const {
    isLogin,
    formData,
    loading,
    error,
    toggleAuthMode,
    handleInputChange,
    submitForm,
    resetForm
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock authentication callback - in a real app, this would connect to your auth service
    const authCallback = async (data) => {
      console.log(isLogin ? 'Login submitted:' : 'Signup submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just show success message
      alert(`${isLogin ? 'Login' : 'Signup'} functionality would be implemented here`);
      resetForm();
    };

    await submitForm(authCallback);
  };

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
            {isLogin ? 'Welcome Back to DO IT' : 'Welcome to DO IT'}
          </h1>
          <p className="text-blue-100 mt-2">
            {isLogin ? 'Sign in to continue' : 'Create an account to get started'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-5">
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="mb-6 text-right">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02]`}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-all duration-200 hover:shadow-md"
                >
                  <FaApple className="h-5 w-5 text-gray-700" />
                  <span className="ml-2">Apple</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-all duration-200 hover:shadow-md"
                >
                  <FaGoogle className="h-5 w-5 text-red-500" />
                  <span className="ml-2">Google</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;