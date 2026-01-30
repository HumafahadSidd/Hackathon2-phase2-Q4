---

description: "Task list for Hackathon Todo Phase II implementation"
---

# Tasks: Hackathon Todo Phase II

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Agent and Skills Framework

For appropriate tasks, utilize the following AI agents and skills:
- Use nextjs-builder for Next.js application development
- Use specification-agent for creating comprehensive technical specifications
- Use spec-auditor for compliance and security audits
- Use project-planner for creating comprehensive project plans
- Use task-decomposer for breaking down complex projects into executable tasks
- Use constitution-agent for defining system laws and governance policies
- Use jwt-security-auditor for auditing JWT authentication flows
- Leverage skills in `.qwen/skills/` directory for domain-specific expertise

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend directory structure: `backend/src/models`, `backend/src/services`, `backend/src/api`, `backend/src/middleware`
- [X] T002 Create frontend directory structure: `frontend/src/components`, `frontend/src/pages`, `frontend/src/services`, `frontend/src/hooks`, `frontend/src/utils`
- [X] T003 Create test directory structures: `backend/tests/unit`, `backend/tests/integration`, `backend/tests/contract`, `frontend/tests/unit`, `frontend/tests/integration`
- [X] T004 Initialize backend requirements file with FastAPI, SQLModel, Neon driver, Better Auth dependencies
- [X] T005 Initialize frontend package.json with Next.js, React, and authentication dependencies
- [X] T006 Create the `.spec-kit/config.yaml` file referencing the existing configuration
- [X] T007 Create the `.specify/memory/constitution.md` file referencing the existing constitution
- [X] T008 Create the `specs/checklists/requirements.md` file referencing the existing checklist
- [X] T009 Create the `history/prompts/todo-app/` directory structure for PHRs
- [X] T010 Create root-level configuration files (`.gitignore`, `README.md`, `CLAUDE.md`)
- [X] T011 Create the `.qwen/skills/` directory structure for AI agent skills
- [X] T012 Create the `.qwen/skills/nextjs/skill.md` file with Next.js development expertise

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T011 Create the main FastAPI application file `backend/src/main.py` with proper configuration
- [ ] T012 Create the database connection module `backend/src/database.py` with Neon connection setup
- [ ] T013 Create the SQLModel models in `backend/src/models/` based on `@specs/database/schema.md`
- [ ] T014 Implement the Alembic migration system in `backend/alembic/` with proper configuration
- [ ] T015 Create the initial database migration based on the schema
- [ ] T016 Set up the Pydantic models for request/response validation
- [ ] T017 Create the settings/configuration module with environment variable handling
- [ ] T018 Implement the startup/shutdown events for database connection management
- [ ] T019 Create the initial API router structure in `backend/src/api/`
- [ ] T020 Set up the basic middleware for CORS and error handling
- [ ] T021 Install and configure Better Auth in the frontend with proper configuration
- [ ] T022 Set up the shared secret for JWT signing between frontend and backend
- [ ] T023 Create the authentication API endpoints in the backend
- [ ] T024 Implement JWT verification middleware in the backend
- [ ] T025 Create the user registration and login services in the backend
- [ ] T026 Implement the token refresh mechanism if needed
- [ ] T027 Create the authentication context in the frontend
- [ ] T028 Set up protected route handling in the frontend
- [ ] T029 Implement logout functionality in both frontend and backend
- [ ] T030 Add proper error handling for authentication failures

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Task Creation (Priority: P1) 🎯 MVP

**Goal**: As an authenticated user, I want to create new tasks so that I can organize my work and responsibilities.

**Independent Test**: User can successfully create a new task and see it in their task list.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T031 [P] [US1] Contract test for POST /api/{user_id}/tasks in backend/tests/contract/test_tasks.py
- [ ] T032 [P] [US1] Integration test for task creation user journey in backend/tests/integration/test_tasks.py

### Implementation for User Story 1

- [X] T033 [P] [US1] Create Task model in backend/src/models/task.py
- [X] T034 [P] [US1] Create Task schema in backend/src/schemas/task.py
- [X] T035 [US1] Implement TaskService in backend/src/services/tasks.py (depends on T033)
- [X] T036 [US1] Implement POST /api/{user_id}/tasks endpoint in backend/src/api/tasks.py
- [X] T037 [US1] Add validation and error handling for task creation
- [X] T038 [US1] Add logging for task creation operations
- [X] T039 [US1] Create TaskForm component in frontend/src/components/TaskForm.jsx
- [X] T040 [US1] Add task creation functionality to dashboard page in frontend/src/app/dashboard/page.js
- [X] T041 [US1] Implement API client service for task creation in frontend/src/services/api.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Viewing (Priority: P1)

**Goal**: As an authenticated user, I want to view my tasks so that I can see what I need to do.

**Independent Test**: User can view all their tasks in a readable format.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T042 [P] [US2] Contract test for GET /api/{user_id}/tasks in backend/tests/contract/test_tasks.py
- [ ] T043 [P] [US2] Contract test for GET /api/{user_id}/tasks/{id} in backend/tests/contract/test_tasks.py
- [ ] T044 [P] [US2] Integration test for task viewing user journey in backend/tests/integration/test_tasks.py

### Implementation for User Story 2

- [X] T045 [P] [US2] Implement GET /api/{user_id}/tasks endpoint in backend/src/api/tasks.py
- [X] T046 [P] [US2] Implement GET /api/{user_id}/tasks/{id} endpoint in backend/src/api/tasks.py
- [X] T047 [US2] Add task retrieval service methods in backend/src/services/tasks.py
- [X] T048 [US2] Add validation and error handling for task viewing
- [X] T049 [US2] Create TaskList component in frontend/src/components/TaskList.jsx
- [X] T050 [US2] Create TaskItem component in frontend/src/components/TaskItem.jsx
- [X] T051 [US2] Update dashboard page to display user's tasks in frontend/src/app/dashboard/page.js
- [X] T052 [US2] Create task detail page in frontend/src/app/tasks/[id]/page.js
- [X] T053 [US2] Implement API client service for task retrieval in frontend/src/services/api.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Update (Priority: P2)

**Goal**: As an authenticated user, I want to update my tasks so that I can modify their details as needed.

**Independent Test**: User can successfully update their own task details.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T054 [P] [US3] Contract test for PUT /api/{user_id}/tasks/{id} in backend/tests/contract/test_tasks.py
- [ ] T055 [P] [US3] Integration test for task update user journey in backend/tests/integration/test_tasks.py

### Implementation for User Story 3

- [X] T056 [US3] Implement PUT /api/{user_id}/tasks/{id} endpoint in backend/src/api/tasks.py
- [X] T057 [US3] Add task update service methods in backend/src/services/tasks.py
- [X] T058 [US3] Add validation and error handling for task updates
- [X] T059 [US3] Enhance TaskForm component to support editing in frontend/src/components/TaskForm.jsx
- [X] T060 [US3] Add edit functionality to TaskItem component in frontend/src/components/TaskItem.jsx
- [X] T061 [US3] Implement API client service for task updates in frontend/src/services/api.js

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - Task Deletion (Priority: P2)

**Goal**: As an authenticated user, I want to delete my tasks so that I can remove items I no longer need.

**Independent Test**: User can successfully delete their own tasks.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T062 [P] [US4] Contract test for DELETE /api/{user_id}/tasks/{id} in backend/tests/contract/test_tasks.py
- [ ] T063 [P] [US4] Integration test for task deletion user journey in backend/tests/integration/test_tasks.py

### Implementation for User Story 4

- [X] T064 [US4] Implement DELETE /api/{user_id}/tasks/{id} endpoint in backend/src/api/tasks.py
- [X] T065 [US4] Add task deletion service methods in backend/src/services/tasks.py
- [X] T066 [US4] Add validation and error handling for task deletion
- [X] T067 [US4] Create Task deletion confirmation modal in frontend/src/components/TaskModal.jsx
- [X] T068 [US4] Add delete functionality to TaskItem component in frontend/src/components/TaskItem.jsx
- [X] T069 [US4] Implement API client service for task deletion in frontend/src/services/api.js

**Checkpoint**: User Stories 1, 2, 3, and 4 should now be independently functional

---

## Phase 7: User Story 5 - Task Completion (Priority: P2)

**Goal**: As an authenticated user, I want to mark my tasks as complete so that I can track my progress.

**Independent Test**: User can mark their tasks as complete/incomplete.

### Tests for User Story 5 (OPTIONAL - only if tests requested) ⚠️

- [ ] T070 [P] [US5] Contract test for PATCH /api/{user_id}/tasks/{id}/complete in backend/tests/contract/test_tasks.py
- [ ] T071 [P] [US5] Integration test for task completion user journey in backend/tests/integration/test_tasks.py

### Implementation for User Story 5

- [X] T072 [US5] Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint in backend/src/api/tasks.py
- [X] T073 [US5] Add task completion service methods in backend/src/services/tasks.py
- [X] T074 [US5] Add validation and error handling for task completion
- [X] T075 [US5] Add completion toggle functionality to TaskItem component in frontend/src/components/TaskItem.jsx
- [X] T076 [US5] Implement API client service for task completion in frontend/src/services/api.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Frontend Foundation (Next.js App Router + Layout + Auth UI)

**Goal**: Set up the foundational frontend structure with Next.js App Router, layout components, and authentication UI.

### Tests for Frontend Foundation (OPTIONAL - only if tests requested) ⚠️

- [ ] T077 [P] [FF] Unit tests for authentication context in frontend/tests/unit/test_auth.js
- [ ] T078 [P] [FF] Unit tests for layout components in frontend/tests/unit/test_layout.js

### Implementation for Frontend Foundation

- [ ] T079 Initialize the Next.js project with App Router in the `frontend/` directory
- [ ] T080 Create the main layout structure in frontend/src/app/layout.js
- [ ] T081 Implement the header and navigation components in frontend/src/components/Header.jsx
- [ ] T082 Create the authentication pages (login, signup) in frontend/src/app/
- [ ] T083 Set up the protected layout wrapper component in frontend/src/components/ProtectedLayout.jsx
- [ ] T084 Implement the authentication context provider in frontend/src/context/AuthContext.js
- [ ] T085 Create the main dashboard page structure in frontend/src/app/dashboard/page.js
- [ ] T086 Set up the routing configuration for protected routes in frontend/src/middleware.js
- [ ] T087 Create the basic UI components for authentication flows in frontend/src/components/auth/
- [ ] T088 Add proper error handling and loading states to frontend components

**Checkpoint**: Frontend foundation is complete with authentication UI

---

## Phase 9: Full Stack Integration (JWT passing + E2E flows)

**Goal**: Integrate the frontend and backend systems to create seamless end-to-end user flows with proper JWT handling.

### Tests for Integration (OPTIONAL - only if tests requested) ⚠️

- [ ] T089 [P] [INT] End-to-end test for authentication flow in frontend/tests/e2e/auth-flow.test.js
- [ ] T090 [P] [INT] End-to-end test for task management flow in frontend/tests/e2e/task-flow.test.js

### Implementation for Integration

- [ ] T091 Configure the frontend API client to automatically include JWTs in requests in frontend/src/services/api.js
- [ ] T092 Implement proper error handling for authentication failures in frontend/src/utils/errorHandler.js
- [ ] T093 Implement proper session management and token refresh in frontend/src/hooks/useAuth.js
- [ ] T094 Add loading states and error boundaries throughout the app in frontend/src/components/ErrorBoundary.jsx
- [ ] T095 Integrate the frontend with all backend API endpoints
- [ ] T096 Implement proper form validation and error display in frontend components
- [ ] T097 Add proper navigation after successful operations in frontend/src/hooks/useTasks.js
- [ ] T098 Create a unified error handling system in frontend/src/utils/errorHandler.js
- [ ] T099 Test all user flows from authentication to task management

**Checkpoint**: Full stack integration is complete with working end-to-end flows

---

## Phase 10: Hardening, Security & Validation

**Goal**: Strengthen the application with security measures, validation, and edge case handling.

### Tests for Hardening (OPTIONAL - only if tests requested) ⚠️

- [ ] T100 [P] [HARD] Unit tests for security middleware in backend/tests/unit/test_security.py
- [ ] T101 [P] [HARD] Unit tests for input validation in backend/tests/unit/test_validation.py
- [ ] T102 [P] [HARD] Unit tests for input validation in frontend/tests/unit/test_validation.js

### Implementation for Hardening

- [ ] T103 Add comprehensive input validation on both frontend and backend
- [ ] T104 Implement rate limiting for authentication endpoints in backend/src/middleware/rate_limit.py
- [ ] T105 Add CSRF protection mechanisms in backend/src/middleware/csrf.py
- [ ] T106 Implement proper logging and monitoring in backend/src/utils/logging.py
- [ ] T107 Add security headers to API responses in backend/src/middleware/security.py
- [ ] T108 Conduct security review of authentication flow
- [ ] T109 Add data sanitization for user inputs in backend/src/utils/sanitization.py
- [ ] T110 Implement proper error masking to avoid information leakage in backend/src/middleware/error_handler.py
- [ ] T111 Add comprehensive edge case testing for all user flows
- [ ] T112 Perform security scanning and vulnerability assessment

**Checkpoint**: Application is hardened with security measures and validation

---

## Phase 11: Spec Compliance Audit

**Goal**: Verify that the complete implementation complies with all specifications and constitutional requirements.

### Implementation for Compliance Audit

- [ ] T113 Conduct a comprehensive review against all specification documents
- [ ] T114 Verify that all constitutional principles are implemented
- [ ] T115 Check that all API endpoints match the specified contracts
- [ ] T116 Validate that user data isolation is properly enforced
- [ ] T117 Confirm that all user stories from feature specs are implemented
- [ ] T118 Verify that all architectural requirements are met
- [ ] T119 Test all edge cases mentioned in specifications
- [ ] T120 Validate that no manual coding was performed
- [ ] T121 Confirm that all database schema requirements are met
- [ ] T122 Document any deviations and create remediation plan

**Checkpoint**: All specifications are fully implemented and compliant

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T123 [P] Documentation updates in docs/
- [ ] T124 Code cleanup and refactoring
- [ ] T125 Performance optimization across all stories
- [ ] T126 [P] Additional unit tests (if requested) in tests/unit/
- [ ] T127 Security hardening
- [ ] T128 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Frontend Foundation (Phase 8)**: Depends on authentication system from foundational phase
- **Integration (Phase 9)**: Depends on all API endpoints and frontend components
- **Hardening (Phase 10)**: Depends on all functionality being implemented
- **Compliance Audit (Phase 11)**: Depends on all implementation being complete
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1-US4 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for POST /api/{user_id}/tasks in backend/tests/contract/test_tasks.py"
Task: "Integration test for task creation user journey in backend/tests/integration/test_tasks.py"

# Launch all models for User Story 1 together:
Task: "Create Task model in backend/src/models/task.py"
Task: "Create Task schema in backend/src/schemas/task.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add Frontend Foundation → Test independently → Deploy/Demo
8. Add Integration → Test independently → Deploy/Demo
9. Add Hardening → Test independently → Deploy/Demo
10. Add Compliance Audit → Test independently → Deploy/Demo
11. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Constitutional Compliance Checks

- [ ] All code generated by AI agents (no manual coding)
- [ ] Spec-first development followed (implementation based on approved specs)
- [ ] Full-stack architecture compliance (Next.js/FastAPI/PostgreSQL/SQLModel/Better Auth)
- [ ] Security-first implementation (authentication/authorization on all layers)
- [ ] Multi-user data isolation (proper ownership verification)
- [ ] API contract compliance (strict adherence to defined endpoints)
- [ ] AI agent and skills framework compliance (appropriate agents used for tasks)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence