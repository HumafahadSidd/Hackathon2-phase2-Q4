# UI Specification: Pages and Navigation

## Purpose
Define the pages, routing, and navigation flow for the todo application frontend. Ensure intuitive user experience with proper authentication flow and protected routes.

## Scope
- Application pages and layouts
- Routing structure and navigation
- Protected route handling
- User flows and transitions
- Responsive design considerations

## Page Structure

### Layout Components
- **Header**: Contains navigation, user profile, and logout
- **Main Content Area**: Page-specific content
- **Footer**: Links, copyright, and additional information

### Page List

#### 1. Landing Page (`/`)
Public landing page for unauthenticated users.

**Purpose**: Welcome screen with login/signup options
**Components**: Hero section, feature highlights, login/signup buttons
**Navigation**: Link to login, link to signup
**Authentication**: Public access

#### 2. Login Page (`/login`)
User authentication page.

**Purpose**: Allow existing users to log in
**Components**: Email/password form, "Forgot password" link, "Sign up" link
**Navigation**: Submit to dashboard, link to signup, link to forgot password
**Authentication**: Public access
**Protected Route Behavior**: Redirect to dashboard if already logged in

#### 3. Signup Page (`/signup`)
New user registration page.

**Purpose**: Allow new users to create an account
**Components**: Registration form (email, password, username), "Already have account" link
**Navigation**: Submit to dashboard, link to login
**Authentication**: Public access
**Protected Route Behavior**: Redirect to dashboard if already logged in

#### 4. Dashboard Page (`/dashboard`)
Main application page showing user's tasks.

**Purpose**: Display and manage user's tasks
**Components**: Task list, add task form, filter controls, user profile
**Navigation**: Add task, view task details, edit task, delete task, logout
**Authentication**: Protected - requires valid JWT
**Protected Route Behavior**: Redirect to login if not authenticated

#### 5. Task Detail Page (`/tasks/[id]`)
View and edit individual task details.

**Purpose**: Show detailed view of a specific task
**Components**: Task title, description, completion status, edit/delete buttons
**Navigation**: Back to dashboard, edit task, delete task, mark complete/incomplete
**Authentication**: Protected - requires valid JWT
**Protected Route Behavior**: Redirect to login if not authenticated

#### 6. Profile Page (`/profile`)
User profile management page.

**Purpose**: Allow user to view and update profile information
**Components**: Profile form, account settings, security options
**Navigation**: Update profile, change password, delete account
**Authentication**: Protected - requires valid JWT
**Protected Route Behavior**: Redirect to login if not authenticated

## Routing Structure

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes
- `/dashboard` - Main dashboard
- `/tasks/[id]` - Task detail page
- `/profile` - User profile page
- `/tasks` - Task management (alternative route)

### Route Protection
- Middleware checks for valid JWT in localStorage/session
- Redirects to `/login` if JWT is missing or invalid
- Preserves intended destination for redirect after login

## Protected Routes Implementation
1. **Route Guard**: Check for valid JWT before rendering protected pages
2. **Redirect Logic**: Send unauthenticated users to login page
3. **Preserve Intent**: Remember original destination for post-login redirect
4. **Token Refresh**: Handle token expiration gracefully

## User Flows

### Flow 1: New User Registration
1. User visits `/` (landing page)
2. Clicks "Sign Up" button
3. Navigates to `/signup`
4. Completes registration form
5. Authenticates and receives JWT
6. Redirected to `/dashboard`

### Flow 2: Existing User Login
1. User visits `/` (landing page)
2. Clicks "Log In" button
3. Navigates to `/login`
4. Completes login form
5. Authenticates and receives JWT
6. Redirected to `/dashboard`

### Flow 3: Task Management
1. User on `/dashboard`
2. Views task list
3. Clicks "Add Task" button
4. Task added to list
5. Clicks on specific task
6. Navigates to `/tasks/[id]`
7. Edits or marks task complete
8. Returns to dashboard

### Flow 4: Task Completion
1. User on `/dashboard`
2. Sees task list with checkboxes
3. Clicks checkbox to mark task complete
4. Visual feedback confirms update
5. Task moves to completed section

## Responsive Design
- **Mobile**: Single-column layout, touch-friendly elements
- **Tablet**: Adapted column layout, optimized touch targets
- **Desktop**: Multi-column layout with additional features

## Navigation Components
- **Top Navigation Bar**: Logo, main navigation, user profile
- **Sidebar**: Secondary navigation, filters, quick actions
- **Breadcrumbs**: Current location context
- **Floating Action Button**: Primary action (e.g., add task)

## Error Handling
- **Authentication Errors**: Redirect to login with error message
- **Network Errors**: Display user-friendly error messages
- **Permission Errors**: Show appropriate error for unauthorized access
- **Validation Errors**: Inline validation feedback

## Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management for dynamic content