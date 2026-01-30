# Authentication System Documentation

## Overview
The DO IT app uses a modern authentication system with both login and signup functionality. The UI is designed with a clean, minimalist aesthetic and follows best practices for user experience.

## Components

### AuthForms Component
- Located at `src/components/AuthForms.jsx`
- Handles both login and signup forms in a single component
- Uses a custom hook (`useAuth`) for state management
- Implements form validation
- Provides social login options

### useAuth Hook
- Located at `src/hooks/useAuth.js`
- Manages authentication state (login vs signup)
- Handles form data
- Implements validation logic
- Manages loading and error states

## Features

### Form Validation
- Email format validation
- Password length validation (minimum 6 characters)
- Required field validation
- Real-time error messaging

### Social Login
- Apple login option
- Google login option
- Consistent styling with the rest of the UI

### Responsive Design
- Works on mobile, tablet, and desktop
- Adapts layout based on screen size
- Touch-friendly controls

## Styling

### Color Palette
- Primary background: Blue gradient (`linear-gradient(135deg, #4F95DA 0%, #6B728E 100%)`)
- Form background: White
- Primary button: Blue (`#4F95DA`)
- Text: Dark gray for form elements, white for headings

### Typography
- Headings: Bold, 2xl (24px)
- Labels: Medium, sm (14px)
- Body text: Regular, sm (14px)

### Layout
- Centered card layout with max-width of 448px
- Rounded corners (rounded-2xl)
- Subtle shadows (shadow-xl)

## Implementation Details

### State Management
```javascript
{
  isLogin: boolean,           // Current mode (login/signup)
  formData: object,           // Form field values
  loading: boolean,           // Loading state during submission
  error: string,              // Error message if any
  toggleAuthMode: function,   // Switch between login/signup
  handleInputChange: function, // Handle form input changes
  submitForm: function,       // Submit form with validation
  resetForm: function         // Reset form fields
}
```

### Form Fields
- **Login Form**: Email, Password
- **Signup Form**: Full Name, Email, Password

### Error Handling
- Validation errors displayed above the form
- Clear error messages for different validation failures
- Error clearing when user starts correcting inputs

## Future Enhancements

1. Connect to authentication service (JWT, OAuth, etc.)
2. Add "Remember me" functionality
3. Implement password strength indicator
4. Add accessibility improvements (ARIA attributes, keyboard navigation)
5. Add loading indicators for social login buttons
6. Implement "Forgot password" flow
7. Add account verification flow for new signups

## Testing

Unit tests are located in `tests/auth-forms.test.js` and cover:
- Form rendering in both modes
- Mode switching functionality
- Form validation
- Error message display

## Security Considerations

- Password fields use `type="password"` to mask input
- Form data is handled securely in component state
- Social login buttons are placeholders - implementation would require secure OAuth integration
- Form submissions should be protected against CSRF attacks in production
- Passwords should be properly hashed and stored securely on the backend