<<<<<<< HEAD
# Modern Authentication UI

This project features a premium, animated authentication UI with the following enhancements:

## Features

- **Modern Design**: Clean, card-based layout with gradient backgrounds and soft shadows
- **Smooth Animations**: Using Framer Motion for entrance animations and interactive elements
- **Responsive Layout**: Fully responsive design that works on all device sizes
- **Form Validation**: Real-time validation with custom hook implementation
- **Password Visibility Toggle**: Show/hide password functionality
- **Loading States**: Visual feedback during authentication processes
- **Interactive Elements**: Hover and tap animations on buttons and inputs
- **Premium Aesthetics**: Carefully chosen colors, typography, and spacing

## Components

- `AuthLayout.js`: Shared authentication layout with animated background
- `FormComponents.js`: Reusable Input and Button components with animations
- `useFormValidation.js`: Custom hook for form validation

## Pages

- `login/page.js`: Modern login interface with validation
- `signup/page.js`: Modern signup interface with validation

## Technologies Used

- Next.js 14 with App Router
- Tailwind CSS for styling
- Framer Motion for animations
- Custom form validation hook

## Design Elements

- Gradient backgrounds
- Glass-morphism cards with backdrop blur
- Smooth transitions and micro-interactions
- Animated background blobs for visual interest
- Consistent spacing and typography
- Accessible form elements

## Responsive Behavior

- Adapts to mobile, tablet, and desktop screens
- Touch-friendly elements for mobile devices
- Properly sized tap targets
=======
# Authentication UI for DO IT App

This document describes the authentication UI components implemented for the DO IT productivity app, including login and signup forms.

## Features

- Modern, clean design with blue gradient background
- Responsive layout that works on all device sizes
- Toggle between login and signup forms
- Form validation for required fields
- Social login options (Apple and Google)
- "Forgot password" link for login form
- Consistent branding with checkmark logo

## Components

### AuthForms Component

The main authentication component that handles both login and signup functionality:

- Located at `src/components/AuthForms.jsx`
- Uses React state to manage form data and toggle between login/signup
- Implements form validation
- Includes social login options
- Responsive design using Tailwind CSS

## Design Elements

- **Background**: Blue gradient (`linear-gradient(135deg, #4F95DA 0%, #6B728E 100%)`)
- **Form Card**: White background with rounded corners and shadow
- **Input Fields**: White background with subtle border, icons on the left
- **Buttons**: Blue primary button with hover effects
- **Icons**: From react-icons library (FaEnvelope, FaLock, FaUser, FaApple, FaGoogle, FaCheck)

## Pages

- Login page: `src/app/login/page.js`
- Signup page: `src/app/signup/page.js`
- Both pages render the AuthForms component

## Usage

The AuthForms component is currently imported and used in both the login and signup pages. The component manages its own state to determine whether to show the login or signup form.

## Future Enhancements

- Connect to authentication service
- Add password strength indicator
- Implement "Remember me" option
- Add loading states during form submission
- Add accessibility improvements
>>>>>>> 1de9837 (adding)
