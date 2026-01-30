<!-- SYNC IMPACT REPORT
Version change: N/A (initial creation) → 1.0.0
Modified principles: N/A
Added sections: All principles and sections (initial constitution)
Removed sections: None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md - Updated to reflect new principles
- ✅ .specify/templates/spec-template.md - Updated to reflect new principles
- ✅ .specify/templates/tasks-template.md - Updated to reflect new principles
- ✅ .specify/templates/commands/*.md - Verified no outdated references
Runtime guidance docs: README.md - Created to reference new constitution
Follow-up TODOs: None
-->

# Hackathon Todo Phase II Constitution

## Core Principles

### I. Spec-First Development (NON-NEGOTIABLE)
Every feature, endpoint, and component must be specified before implementation begins. Specifications must detail inputs, outputs, behaviors, error conditions, and acceptance criteria. No code shall be written without a corresponding specification. All implementations must be traceable back to specific specification items.

### II. No Manual Coding Rule
All code must be generated exclusively through AI agents using spec-driven development. Manual coding by humans is strictly prohibited. Any code committed to the repository must be agent-generated. Human intervention is limited to specification creation, review, and approval processes.

### III. Full-Stack Architecture Compliance
The system must strictly adhere to the defined technology stack: Frontend (Next.js 16+ with App Router), Backend (Python FastAPI), Database (Neon Serverless PostgreSQL), ORM (SQLModel), and Authentication (Better Auth with JWT). Deviations require constitutional amendment.

### IV. Security-First Design
Authentication and authorization must be implemented at every layer. All API requests require JWT verification. User data isolation is mandatory - users can only access their own data. Database queries must be filtered by authenticated user ID. Security vulnerabilities are treated as critical defects.

### V. Multi-User Data Isolation
Each user operates in a siloed environment. Users cannot view, modify, or delete other users' data. The backend must enforce ownership checks on all data operations. Database schema must support multi-tenancy through user ID foreign keys.

### VI. API Contract Compliance
All API endpoints must conform to the specified contract: GET /api/{user_id}/tasks, POST /api/{user_id}/tasks, GET /api/{user_id}/tasks/{id}, PUT /api/{user_id}/tasks/{id}, DELETE /api/{user_id}/tasks/{id}, PATCH /api/{user_id}/tasks/{id}/complete. Any deviation requires specification update and constitutional amendment.

### VII. AI Agent and Skills Framework Compliance
The system must leverage AI agents and skills for development tasks. The .qwen/skills directory contains specialized skills that enhance agent capabilities. Agents must be used appropriately based on their expertise (e.g., nextjs-builder for Next.js applications, spec-auditor for compliance checks). Deviations from using appropriate agents require constitutional amendment.

## Technical Constraints

### Monorepo Structure
The repository must maintain a strict monorepo structure with designated directories: /specs for all specifications, /frontend for Next.js code, /backend for FastAPI code. All configuration files must be properly organized at the root and layered appropriately.

### Authentication Flow
Better Auth must handle user signup/login and issue JWTs. Frontend must send JWTs in Authorization headers. Backend must verify JWTs using shared secrets and extract user IDs for ownership verification. Session management follows JWT expiration policies.

### Database Design
All tables must include user_id foreign keys for data ownership. SQLModel must be used for all ORM operations. Neon Serverless PostgreSQL features must be leveraged for scalability. Migrations must be handled through SQLModel's migration system.

### Agent and Skills Framework
AI agents must be used according to their designated purposes. Specialized skills (stored in .qwen/skills/) must be leveraged to enhance agent capabilities. The nextjs skill must be used for Next.js development tasks. Agent usage must comply with constitutional principles and development workflows.

## Development Workflow

### Phase-Based Evolution
Development follows a phased approach: Phase II focuses on transforming the console-based app into a full-stack web application. Each phase must be completed before advancing. New features must be scoped to appropriate phases and cannot bleed across phase boundaries without constitutional amendment.

### Specification Approval Process
Specifications must undergo formal approval before implementation. All stakeholders must sign off on functional and non-functional requirements. Changes to specifications require the same approval process. Implementation teams must not proceed without approved specifications.

### Testing Requirements
Comprehensive testing is mandatory: Unit tests for all functions, Integration tests for API endpoints, End-to-end tests for user flows, Security tests for authentication and authorization. Test coverage minimums must be defined in specifications and enforced in CI/CD pipelines.

### Agent Selection and Skills Utilization
Appropriate AI agents must be selected based on the task at hand:
- Use nextjs-builder for Next.js application development
- Use specification-agent for creating comprehensive technical specifications
- Use spec-auditor for compliance and security audits
- Use project-planner for creating comprehensive project plans
- Use task-decomposer for breaking down complex projects into executable tasks
- Use constitution-agent for defining system laws and governance policies
- Use jwt-security-auditor for auditing JWT authentication flows

Specialized skills (stored in .qwen/skills/) must be utilized to enhance agent capabilities for specific domains.

## Governance
The constitution supersedes all other development practices. Amendments require documentation of rationale, approval from all stakeholders, and a migration plan for existing code. All pull requests and reviews must verify constitutional compliance. Code that violates constitutional principles will be rejected.

**Version**: 1.0.0 | **Ratified**: 2026-01-20 | **Last Amended**: 2026-01-21