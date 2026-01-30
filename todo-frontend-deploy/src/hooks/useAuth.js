// hooks/useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateInputs = () => {
    if (!isLogin && !formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email address is invalid');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const submitForm = async (onSubmitCallback) => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await onSubmitCallback({ ...formData, isLogin });
    } catch (err) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: ''
    });
    setError('');
  };

  return {
    isLogin,
    formData,
    loading,
    error,
    toggleAuthMode,
    handleInputChange,
    submitForm,
    resetForm
  };
};

export default useAuth;