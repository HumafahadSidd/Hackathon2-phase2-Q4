# Authentication UI Specification for DO IT App

## Overview
This document outlines the design and implementation of the login and signup forms for the DO IT productivity app. The UI follows modern design principles with a clean, minimalist aesthetic and consistent branding.

## Design Elements

### Color Scheme
- Primary Background: Blue gradient (`linear-gradient(135deg, #4F95DA 0%, #6B728E 100%)`)
- Form Background: White
- Text Colors: 
  - Headings: White
  - Body: Gray-700
  - Links: Blue-600

### Typography
- Headings: Bold, 2xl (24px)
- Labels: Medium, sm (14px)
- Body text: Regular, sm (14px)

### Layout
- Centered card layout with max-width of 448px (max-w-md)
- Rounded corners (rounded-2xl)
- Subtle shadows (shadow-xl)

## Components

### 1. Logo Area
- Checkmark icon in a white circle with 20% opacity
- Positioned above the heading
- Size: 64x64px (h-16 w-16)

### 2. Headings
- Login: "Welcome Back to DO IT"
- Signup: "Welcome to DO IT"
- Subtitle varies based on form type

### 3. Form Fields
- Email field (present in both forms)
- Password field (present in both forms)
- Full Name field (only in signup form)
- Minimalistic icons inside input fields
- Consistent styling with rounded borders and focus rings

### 4. Buttons
- Primary action: Sign In/Sign Up button
- Social login buttons: Apple and Google
- Toggle button to switch between forms

### 5. Social Login Section
- Divider with "Or continue with" text
- Two-column layout for social buttons
- Icons with brand-appropriate colors

## Functionality

### State Management
- Toggle between login and signup forms
- Form data storage using React state
- Input validation

### Responsive Design
- Works on mobile, tablet, and desktop
- Proper spacing and padding adjustments
- Flexible grid layouts

## Implementation Notes
- Using Tailwind CSS for styling
- React Icons for iconography
- Client-side component using React hooks
- Form submission handling