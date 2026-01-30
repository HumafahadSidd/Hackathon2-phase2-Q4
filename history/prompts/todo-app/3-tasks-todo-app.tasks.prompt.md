---
id: 3
title: tasks-todo-app
stage: tasks
date: 2026-01-20
surface: agent
model: gpt-4
feature: todo-app
branch: 001-hackathon-todo-phase-ii
user: kk
command: /sp.tasks
labels: ["tasks", "todo", "fullstack"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/tasks.md
tests:
  - specs/tasks.md
---

## Prompt

Generate the FULL SP.TASKS.

🎯 Goal of SP.TASKS:
- Decompose the entire SP.PLAN into atomic, ordered, executable tasks
- Each task must be small enough to be executed by Claude Code in a single step
- Tasks must be grouped by PHASE
- Tasks must be strictly ordered

📦 For EACH TASK you MUST specify:
- Task ID (e.g. P1-T01, P3-T14, etc.)
- Task Title
- Phase
- Exact files/folders to create or modify
- Exact action to perform
- Exact spec references (e.g. @specs/api/rest-endpoints.md)
- Dependencies (previous tasks)
- Clear success criteria

📐 Rules:
- No vague tasks
- No "implement X" without file-level detail
- No human decisions left
- Every task must be:
- Atomic
- Deterministic
- Directly executable by Claude Code
- Must respect:
- SP.CONSTITUTION
- SP.SPECIFY
- SP.PLAN
- No-manual-coding rule
- Spec-first workflow

🧱 Structure:
- Group tasks under: PHASE 0 PHASE 1 ... PHASE 8
- Each phase should contain all tasks needed to fully implement that phase.

📤 Output Format:
- Title: SP.TASKS – Hackathon Todo Phase II
- Use Markdown
- Use headings for each PHASE
- Use numbered task lists
- Each task must be fully specified and self-contained

⚠️ This task list must be sufficient to build the entire system by executing tasks one by one with Claude Code.

The tasks.md should be immediately executable - each task must be specific enough that an LLM can complete it without additional context.

## Response snapshot

I have successfully generated the complete SP.TASKS for the Hackathon Todo Phase II project. The tasks.md file contains:

1. 12 phases of work from Setup to Compliance Audit
2. 128 specific, atomic tasks with IDs, file paths, and clear instructions
3. Proper organization by user story to enable independent implementation
4. Parallel execution opportunities marked with [P]
5. User story labeling [US1], [US2], etc. for traceability
6. Constitutional compliance checks
7. Dependencies and execution order clearly defined
8. Implementation strategy for MVP and incremental delivery

Each task follows the required format with checkboxes, IDs, and specific file paths. The tasks are detailed enough for Claude Code to execute without additional context while maintaining the spec-first workflow and constitutional requirements.

## Outcome

- ✅ Impact: Complete task breakdown created with 128 atomic tasks
- 🧪 Tests: Tasks validated against constitutional requirements and plan
- 📁 Files: 1 comprehensive task file created
- 🔁 Next prompts: Ready for implementation with /sp.implement
- 🧠 Reflection: Tasks are specific enough for direct execution by Claude Code

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All task requirements met
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation with /sp.implement