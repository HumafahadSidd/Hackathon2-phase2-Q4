---
id: 1
title: specify-todo-app
stage: spec
date: 2026-01-20
surface: agent
model: gpt-4
feature: todo-app
branch: main
user: kk
command: /sp.specify
labels: ["spec", "todo", "fullstack"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/overview.md
  - specs/architecture.md
  - specs/features/task-crud.md
  - specs/features/authentication.md
  - specs/api/rest-endpoints.md
  - specs/api/auth-jwt.md
  - specs/database/schema.md
  - specs/ui/pages.md
  - specs/ui/components.md
  - .spec-kit/config.yaml
  - specs/checklists/requirements.md
tests:
  - specs/checklists/requirements.md
---

## Prompt

You are an expert Spec-Kit Plus specification generator. Using the SP.CONSTITUTION of the system "Hackathon Todo Phase II – Full Stack Web Application", generate the complete SP.SPECIFY specification set for the entire project. Goals of SP.SPECIFY: - Convert the constitution into detailed, structured, implementable specifications - Follow Spec-Kit Plus conventions - Organize specs for a monorepo full-stack system You must generate the following specification files and structure: /specs/ overview.md architecture.md /specs/features/ task-crud.md authentication.md /specs/api/ rest-endpoints.md auth-jwt.md /specs/database/ schema.md /specs/ui/ pages.md components.md /.spec-kit/config.yaml Each file must include: - Clear purpose - Scope - Rules - Constraints - Acceptance criteria (where applicable) Content Requirements: 1) overview.md - System purpose - Phase II goals - Tech stack - Feature list 2) architecture.md - Monorepo architecture - Frontend / backend interaction - Auth flow - JWT flow - Data flow - Agent-driven workflow 3) features/task-crud.md - User stories - CRUD behavior - Ownership rules - Validation rules - Edge cases 4) features/authentication.md - Signup / login behavior - Better Auth usage - JWT issuance - Session handling 5) api/rest-endpoints.md - All endpoints - Request/response models - Auth requirements - Error cases - Ownership enforcement 6) api/auth-jwt.md - JWT format - Token lifetime - Header rules - Verification process 7) database/schema.md - Tables - Fields - Indexes - Relations - Ownership constraints 8) ui/pages.md - App pages - Routing - Protected routes - User flows 9) ui/components.md - Reusable components - Responsibilities - Data flow 10) .spec-kit/config.yaml - Phase definitions - Feature mapping Rules: - Follow Spec-Kit Plus structure - Be precise, implementation-ready - No vague text - No marketing language - Specs must be usable directly by Claude Code for implementation Output Format: - Output each file with clear filename header - Use proper Markdown - The output must be production-grade specification set

## Response snapshot

I have successfully generated the complete SP.SPECIFY specification set for the Hackathon Todo Phase II project based on the constitution. Here are the files created:

1. specs/overview.md - System overview with purpose, goals, tech stack, and feature list
2. specs/architecture.md - Architecture details including monorepo structure, frontend/backend interaction, auth flow, JWT flow, data flow, and agent-driven workflow
3. specs/features/task-crud.md - Task CRUD operations with user stories, rules, constraints, validation rules, and edge cases
4. specs/features/authentication.md - Authentication features with user stories for registration, login, session management, and JWT handling
5. specs/api/rest-endpoints.md - Complete API specification with all endpoints, request/response models, auth requirements, error cases, and ownership enforcement
6. specs/api/auth-jwt.md - JWT authentication specification with format, lifetime, header rules, and verification process
7. specs/database/schema.md - Database schema with tables, fields, indexes, relations, and ownership constraints
8. specs/ui/pages.md - UI pages specification with page structure, routing, protected routes, and user flows
9. specs/ui/components.md - UI components specification with reusable components, responsibilities, and data flow
10. .spec-kit/config.yaml - Configuration with phase definitions and feature mapping
11. specs/checklists/requirements.md - Validation checklist for specification quality

All specifications follow the required structure with clear purpose, scope, rules, constraints, and acceptance criteria where applicable. The specifications are precise, implementation-ready, and follow Spec-Kit Plus conventions without marketing language.

## Outcome

- ✅ Impact: Complete specification set for full-stack todo application created
- 🧪 Tests: Validation checklist confirms all specs meet quality requirements
- 📁 Files: 11 specification files created across multiple categories
- 🔁 Next prompts: Ready for planning phase with /sp.plan
- 🧠 Reflection: Comprehensive spec-first approach ensures implementation follows constitutional principles

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All specifications meet quality criteria
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation planning with /sp.plan