// tests/auth-forms.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForms from '../src/components/AuthForms';

describe('AuthForms Component', () => {
  test('renders login form by default', () => {
    render(<AuthForms />);
    
    expect(screen.getByText('Welcome Back to DO IT')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test('switches to signup form when "Sign up" is clicked', () => {
    render(<AuthForms />);
    
    fireEvent.click(screen.getByText(/sign up/i));
    
    expect(screen.getByText('Welcome to DO IT')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  test('switches back to login form when "Sign in" is clicked', () => {
    render(<AuthForms />);
    
    // First switch to signup
    fireEvent.click(screen.getByText(/sign up/i));
    
    // Then switch back to login
    fireEvent.click(screen.getByText(/sign in/i));
    
    expect(screen.getByText('Welcome Back to DO IT')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<AuthForms />);
    
    // Switch to signup to test full name validation
    fireEvent.click(screen.getByText(/sign up/i));
    
    // Submit without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
    });
  });

  test('shows email validation error', async () => {
    render(<AuthForms />);
    
    // Switch to signup to test email validation
    fireEvent.click(screen.getByText(/sign up/i));
    
    // Enter invalid email
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'invalid-email' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Email address is invalid')).toBeInTheDocument();
    });
  });

  test('shows password validation error', async () => {
    render(<AuthForms />);
    
    // Switch to signup to test password validation
    fireEvent.click(screen.getByText(/sign up/i));
    
    // Enter short password
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });
});