# Create Task Workflow

## Purpose

Create a focused task following the Mehdi AB Method principle: one task at a time to conserve context and avoid redundant implementations. Adapted for Java Spring Boot backend-only projects.

## Core Behavior

**RESPECT USER INSTRUCTIONS AND KEEP IT SIMPLE:**

- If user provides clear requirements -> Follow them exactly, don't ask unnecessary questions
- Only ask when something is genuinely unclear or ambiguous
- Don't overcomplicate simple requests
- Trust the user knows what they want

## Critical Step

**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find where task documents should be created.

## Process

### 1. Define Problem Statement

**CRITICAL: If user provides clear, specific requirements, follow them exactly. Only ask questions if something is genuinely unclear.**

#### Check User's Instructions First:

**If the user already provided specific, clear instructions:**

- Proceed directly to Step 2
- DO NOT ask unnecessary questions
- Trust the user knows what they want

**Only ask clarifying questions if:**

- The request is genuinely vague (e.g., "make it better")
- Critical technical details are missing
- There's a conflict or contradiction

#### Initial Questions (Only when unclear):

- **Problem**: What needs to be solved?
- **Context**: What should we use, follow, or pay attention to?
- **End Result**: What should the final solution look like?

#### Follow-up Questions (Only when necessary):

**If the problem is vague**, ask:

- "Can you describe a specific API behavior or scenario?"
- "What's currently broken or missing?"
- "What triggered this need?"

**For entity/data changes**, ask:

- "Which specific entities or tables need to be modified?"
- "Can you point me to an example in the codebase?"
- "Should this follow a pattern from existing code?"

**For new features**, ask:

- "Which layer will this primarily affect (Controller/Service/Repository)?"
- "Which existing features will this interact with?"
- "What's the expected API contract?"

**For API changes**, ask:

- "What data fields are involved?"
- "Which endpoints need to be created/modified?"
- "What's the data flow (Controller -> Service -> Repository -> Database)?"

**For technical constraints and code guidance**, ask:

- "Are there specific Spring Boot patterns I should follow?"
- "Which existing services or repositories should I reuse or avoid?"
- "Are there particular Spring Boot starters or libraries I must use?"
- "What are the testing requirements for this task?"
- "Are there performance considerations or constraints?"
- "Should this follow any specific package organization patterns?"

#### Proceed When:

- User provided clear instructions -> Follow them exactly
- OR all genuine ambiguities have been resolved

**IMPORTANT:** Do NOT over-clarify. If the user said "add an endpoint for orders", and they explained the data model, that's clear enough.

### 2. Analyze Project Context

**CRITICAL: Before creating any missions, understand the existing codebase:**

1. **Check `.mehdi-ab/structure/index.yaml`** for architecture doc locations
2. **Read architecture documentation** to understand:

   - `tech-stack.md` - Java version, Spring Boot version, Maven/Gradle, dependencies
   - `entry-points.md` - Existing REST endpoints
   - `backend-patterns.md` - Controller/Service/Repository patterns
   - `data-patterns.md` - JPA entities, relationships, migration strategy
   - `security-patterns.md` - Authentication and authorization approach
   - `external-services.md` - Third-party integrations
   - `project-constraints.md` - Limitations and requirements
   - `testing-strategy.md` - JUnit 5, Mockito, TestContainers patterns
   - `infrastructure.md` - Docker, K8s, CI/CD setup

3. **Analyze relevant code areas** based on the problem:

   - Search for similar existing implementations
   - Understand package organization patterns
   - Identify reusable services/repositories
   - Check for existing entities/DTOs related to the task

4. **Extract technical context for documentation**:
   - Code constraints: Package naming conventions, coding standards
   - Architecture hints: Patterns to follow, services to reuse, integration points
   - Spring Boot requirements: Required starters, versions, dependencies
   - API constraints: Endpoint naming, authentication patterns, validation
   - Package organization: Directory structure, import patterns
   - Testing requirements: Coverage expectations, test frameworks, test slices
   - Performance considerations: Caching strategies, query optimization

### 3. Identify Task Type

Based on problem AND project analysis:

- **Backend**: Spring Boot backend changes (controllers, services, repositories, entities)
- **Infrastructure**: Docker, K8s, CI/CD, deployment configuration
- **Planning**: Research, architecture decisions, technology evaluation

#### Task Complexity Assessment:

**Simple Tasks** (Single mission - combine all steps):

- Adding a field to an existing entity and updating the DTO
- Creating a basic CRUD repository for an existing entity
- Adding validation to an existing endpoint
- Simple configuration changes (application.yml)
- Adding a single endpoint that follows existing patterns
- Writing a Flyway migration for a simple schema change

**Complex Tasks** (Multiple missions - break down):

- New feature with multiple entities and endpoints
- Implementing authentication/authorization with Spring Security
- Complex entity relationships with multiple JPA mappings
- Integration with external services (REST/Kafka/Redis)
- Database migration involving data transformation
- Major refactoring or architectural changes

### 4. Create Task Document

Based on `.mehdi-ab/structure/index.yaml`, create a task folder with:

```
tasks/[task-name]/
  progress-tracker.md
  sub-agents-outputs/
```

### 5. Initialize Progress Tracker with All Missions

Create `progress-tracker.md` with:

```markdown
# Task: [Task Name]

## Task Status

Current: Brainstormed

## Problem Statement

[User's problem description]

## Context & Constraints

- [What to use/follow]
- [Any limitations]
- [User requirements]

## Expected Outcome

[Description of end result]

## Task Type

[Backend/Infrastructure/Planning]

## Technical Context

### Code Constraints

- [Package naming conventions to follow]
- [Coding standards and patterns]
- [Specific Spring Boot patterns from existing codebase]

### Architecture Hints

- [Existing services/repositories to reuse]
- [Patterns to follow from similar implementations]
- [Integration points with current architecture]

### Tech Stack Requirements

- [Required Spring Boot starters and versions]
- [Dependencies to avoid or prefer]
- [Spring profile considerations]

### API Constraints

- [Endpoint naming conventions]
- [Authentication/authorization requirements]
- [DTO and validation patterns]

## Code Guidance

### Package Organization

- [Where to place new classes based on project structure]
- [Package conventions to follow]
- [Import patterns]

### Testing Requirements

- [Test coverage expectations]
- [Test class naming and placement patterns]
- [JUnit 5, Mockito, TestContainers usage]

### Performance Considerations

- [Caching strategies to implement]
- [Query optimization requirements]
- [JPA fetch strategy considerations]

## Missions

- [ ] Mission 1: [Backend/Infrastructure] - [Specific action based on project analysis]
- [ ] Mission 2: [Backend/Infrastructure] - [Build on Mission 1]
- [ ] Mission 3: [Backend/Infrastructure] - [Build on Mission 2]
- [ ] Mission N: [Backend/Infrastructure] - [Continue as needed]

## Mission Summaries

_Technical summaries of completed missions - used by future missions to understand context without reading full docs_

### Mission 1: [Description]

(Will be filled when mission completes)

### Mission 2: [Description]

(Will be filled when mission completes)

## Agent Usage Tracking

_Agents used across all missions will be tracked here_

### Mission 1 Agents

- (To be updated during mission execution)

### Mission 2 Agents

- (To be updated during mission execution)

## Sub-Agent Outputs

_Links to detailed agent outputs stored in sub-agents-outputs/ folder_

## Notes

- Task created: YYYY-MM-DD
- Status: Brainstormed -> Validated -> In dev -> Testing -> Completed
- All missions defined upfront based on problem analysis
- Each mission builds incrementally on previous ones
- Agent outputs tracked for context window optimization
```

### 6. Define All Missions Based on Task Type and Project Analysis

**IMPORTANT: Define missions based on actual project structure discovered in Step 2, not generic templates**

#### For Simple Tasks:

**Create a single compact mission that includes all necessary steps**

- Mission 1: Backend - [Complete implementation including entity changes, service logic, controller, DTOs, validation, and testing in one mission]

#### For Complex Tasks (Entity-First Approach):

**Break down into logical, sequential missions following the Spring Boot layer order**

##### Complex Backend Tasks:

- Mission 1: Backend - [JPA entities + repositories + Flyway/Liquibase migration]
- Mission 2: Backend - [Service layer + business logic + validation]
- Mission 3: Backend - [Controllers + DTOs + exception handling]
- Mission 4: Backend - [Testing (JUnit 5, @WebMvcTest, @DataJpaTest, @SpringBootTest)]

##### Complex Backend + Infrastructure Tasks:

- Mission 1: Backend - [JPA entities + repositories + migration]
- Mission 2: Backend - [Services + controllers + DTOs]
- Mission 3: Backend - [Testing]
- Mission 4: Infrastructure - [Docker/K8s/CI-CD configuration]

### 7. Confirm with User

Show the task document with all missions and ask:
"I've created the task with all missions defined. Task status is set to 'Brainstormed'. For complex tasks, I've followed an entity-first approach (entities -> services -> controllers -> tests). Ready to validate and start Mission 1?"

When user confirms, update status to 'Validated' and begin implementation.

## Key Principles

- **Respect user instructions** - If user is clear, follow exactly what they said
- **Keep it simple** - Don't overcomplicate straightforward requests
- **Ask only when unclear** - Only clarify genuine ambiguities, not obvious details
- **Trust the user** - They often know what they want; don't second-guess
- **One task at a time** - Maintain focus, conserve context
- **Entity-first for complex** - JPA entities -> Repositories -> Services -> Controllers -> Tests
- **All missions upfront** - Define complete roadmap when creating task
- **Avoid duplication** - Check if similar work was done in previous tasks
- **Compact simplicity** - Don't over-engineer simple operations

## Never Accept These Vague Requests:

- "Make it better"
- "Fix the bug" (which bug? where?)
- "Add some tests" (for what? which classes?)
- "Improve performance" (of what specifically?)
- "Add CRUD operations" (for what entity? which endpoints?)
- "Refactor the code" (which code? why? what's the goal?)

## Instead, Get Specifics:

- "Add a search endpoint to ProductController that filters by name and category"
- "Fix the 500 error when deleting orders that have associated payments"
- "Add JUnit 5 tests for OrderService.calculateTotal method"
- "Improve query performance for /api/reports endpoint by adding @EntityGraph"
- "Add CRUD for Product entity with JPA auditing and Flyway migration"
- "Refactor UserService to use constructor injection instead of field injection"

## Remember

- **ALWAYS analyze project context first** - Never create generic missions
- Check `.mehdi-ab/structure/index.yaml` for paths
- Read ALL architecture docs before defining missions
- Every mission must specify Backend/Infrastructure/Planning
- Define missions based on discovered patterns, not templates
- Entity-first approach for complex backend tasks
- Each mission incrementally builds on the previous
- Keep task document as working scratchpad
