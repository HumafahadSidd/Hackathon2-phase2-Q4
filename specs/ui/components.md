# UI Specification: Components

## Purpose
Define reusable UI components for the todo application frontend. Establish clear responsibilities, interfaces, and data flow patterns for consistent user experience.

## Scope
- Reusable UI components
- Component responsibilities and interfaces
- Data flow between components
- State management patterns
- Styling and theming guidelines

## Component Categories

### 1. Layout Components

#### Header Component
**Responsibility**: Application header with navigation and user controls
**Props**:
- `isLoggedIn` (boolean): Whether user is authenticated
- `userName` (string): Display name of logged-in user
- `onLogout` (function): Callback for logout action

**Children**: Logo, Navigation links, User profile dropdown
**State**: User menu open/close status
**Data Flow**: Receives user info from parent, emits logout event

#### Sidebar Component
**Responsibility**: Secondary navigation and filters
**Props**: 
- `navigationItems` (array): List of navigation items
- `filters` (object): Available filters for tasks

**Children**: Navigation links, filter controls
**State**: Active navigation item, selected filters
**Data Flow**: Emits navigation and filter change events

#### Footer Component
**Responsibility**: Application footer with links and information
**Props**: None
**Children**: Copyright notice, links to policies, social media
**State**: None
**Data Flow**: Static content

### 2. Authentication Components

#### LoginForm Component
**Responsibility**: Handle user login functionality
**Props**:
- `onLogin` (function): Callback for successful login
- `onNavigateToSignup` (function): Callback to navigate to signup

**Children**: Email input, password input, submit button, "forgot password" link
**State**: Form inputs, submission status, error messages
**Data Flow**: Collects credentials, emits login event with credentials

#### SignupForm Component
**Responsibility**: Handle user registration functionality
**Props**:
- `onSignup` (function): Callback for successful signup
- `onNavigateToLogin` (function): Callback to navigate to login

**Children**: Email input, username input, password input, submit button, terms checkbox
**State**: Form inputs, submission status, error messages
**Data Flow**: Collects registration data, emits signup event with data

### 3. Task Management Components

#### TaskList Component
**Responsibility**: Display list of tasks with filtering capabilities
**Props**:
- `tasks` (array): List of task objects to display
- `onTaskClick` (function): Callback when task is clicked
- `onTaskToggleComplete` (function): Callback when task completion is toggled

**Children**: Filter controls, TaskItem components
**State**: Applied filters, loading status
**Data Flow**: Receives tasks from parent, emits task interaction events

#### TaskItem Component
**Responsibility**: Display individual task with interactive elements
**Props**:
- `task` (object): Task object with id, title, description, completed status
- `onEdit` (function): Callback when edit button clicked
- `onDelete` (function): Callback when delete button clicked
- `onToggleComplete` (function): Callback when completion checkbox clicked

**Children**: Checkbox, task title, description, edit/delete buttons
**State**: Hover state, loading status for updates
**Data Flow**: Displays task data, emits interaction events

#### TaskForm Component
**Responsibility**: Create or edit task details
**Props**:
- `initialData` (object): Initial task data for editing (optional)
- `onSubmit` (function): Callback when form is submitted
- `onCancel` (function): Callback when form is cancelled

**Children**: Title input, description textarea, completion checkbox, submit/cancel buttons
**State**: Form inputs, validation errors, submission status
**Data Flow**: Collects task data, emits submit event with task data

### 4. User Interface Components

#### Button Component
**Responsibility**: Reusable button with consistent styling
**Props**:
- `variant` (string): Button style ('primary', 'secondary', 'danger')
- `size` (string): Button size ('small', 'medium', 'large')
- `disabled` (boolean): Whether button is disabled
- `onClick` (function): Callback when button is clicked
- `children` (node): Button content

**Children**: Content passed via children prop
**State**: Hover and active states
**Data Flow**: Emits click event

#### InputField Component
**Responsibility**: Reusable input field with validation
**Props**:
- `label` (string): Field label
- `type` (string): Input type ('text', 'email', 'password', etc.)
- `value` (string): Current value
- `onChange` (function): Callback when value changes
- `error` (string): Error message to display
- `placeholder` (string): Placeholder text

**Children**: Label, input element, error message
**State**: Focus state
**Data Flow**: Emits change event with new value

#### Modal Component
**Responsibility**: Overlay modal dialog for confirmations and forms
**Props**:
- `isOpen` (boolean): Whether modal is visible
- `title` (string): Modal title
- `onClose` (function): Callback when modal is closed
- `children` (node): Modal content

**Children**: Content passed via children prop
**State**: Open/close state
**Data Flow**: Emits close event

### 5. Utility Components

#### LoadingSpinner Component
**Responsibility**: Indicate loading state
**Props**: None
**Children**: Spinner animation
**State**: None
**Data Flow**: Pure presentation

#### ErrorMessage Component
**Responsibility**: Display error messages consistently
**Props**:
- `message` (string): Error message to display
- `onDismiss` (function): Callback when error is dismissed (optional)

**Children**: Error icon, message text, dismiss button (if applicable)
**State**: Dismissed state
**Data Flow**: Emits dismiss event if dismissible

## Data Flow Patterns

### Unidirectional Data Flow
- Parent components pass data down via props
- Child components emit events via callbacks
- State is managed at appropriate level (component or higher)

### State Management
- Local state for component-specific data (forms, UI states)
- Prop drilling for simple data passing
- Context API for global state (user session, theme)

### Event Handling
- Components emit events using callback props
- Parent components handle events and update state
- Events bubble up through component hierarchy

## Styling Guidelines
- Use CSS Modules or Styled Components for scoping
- Follow design system with consistent spacing, colors, and typography
- Implement responsive design with mobile-first approach
- Ensure accessibility with proper contrast and keyboard navigation

## Component Composition
- Favor composition over inheritance
- Keep components focused on single responsibility
- Use render props or children for flexible content
- Implement compound components for related functionality