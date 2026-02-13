# mehdi-ab

An incremental task management system for Claude Code, adapted for **Java Spring Boot** backend development. Based on the [AB Method](https://github.com/ayoubben18/ab-method) by Ayoub, reimagined for the Spring Boot ecosystem.

## What is mehdi-ab?

mehdi-ab transforms complex Spring Boot development problems into focused, incremental missions. It provides:

- **Structured task decomposition** - Break epic tasks into manageable missions
- **Entity-first approach** - Complex tasks follow JPA Entity -> Repository -> Service -> Controller -> Test order
- **8 specialized agents** - Each expert in a different Spring Boot domain
- **Architecture documentation** - Up to 9 architecture docs generated automatically
- **Progress tracking** - Resume exactly where you left off

## Quick Start

```bash
npx mehdi-ab
```

This installs the workflow system into your Spring Boot project:
- `.mehdi-ab/` - Core workflows, utils, and structure config
- `.claude/commands/` - 10 slash commands for Claude Code
- `.claude/agents/` - 8 specialized Spring Boot agents
- `docs/architecture/` - Architecture documentation directory
- `docs/tasks/` - Task tracking directory

## Usage Guide (Step by Step)

### Step 1: Install into Your Spring Boot Project

```bash
cd your-spring-boot-project
npx mehdi-ab
```

It will ask whether you want to install the 8 builtin agents. Say **yes** (recommended).

### Step 2: Analyze Your Codebase

Open Claude Code in your project and run:

```
/analyze-project
```

This deploys 7 agents in parallel. They scan your `pom.xml`/`build.gradle`, `@RestController` classes, `@Entity` classes, `application.yml`, `SecurityFilterChain`, `Dockerfile`, test files, etc. The result is 9 architecture docs under `docs/architecture/`.

You can also run a focused analysis:

```
/analyze-backend
```

### Step 3: Create a Task When You Have Work To Do

```
/create-task
```

Describe your problem clearly, for example:
- "Add order management with products and payments"
- "Implement JWT authentication for all REST endpoints"
- "Add Redis caching to the product catalog API"

The system will:
1. Read your architecture docs to understand the current codebase
2. Ask clarifying questions only if something is genuinely unclear
3. Assess complexity (simple = 1 mission, complex = multiple missions)
4. Create a `docs/tasks/[task-name]/progress-tracker.md` with all missions planned upfront

### Step 4: Execute Missions One by One

```
/create-mission
```

It asks which task, then picks up the next unfinished mission. For complex backend tasks, missions follow **entity-first order**:

| Mission | Layer | What Gets Built |
|---------|-------|-----------------|
| 1 | Data | JPA entities, repositories, Flyway/Liquibase migration |
| 2 | Service | Business logic, `@Transactional`, validation |
| 3 | API | `@RestController`, DTOs, `@ControllerAdvice` |
| 4 | Test | JUnit 5, `@WebMvcTest`, `@DataJpaTest`, `@SpringBootTest` |

Each mission deploys the right specialized agent automatically (e.g., `jpa-data-architect` for Mission 1, `api-designer` for Mission 3).

Simple tasks (e.g., "add a field to an entity") are done in a single mission.

### Step 5: Add Tests

```
/test-mission
```

Creates layer-appropriate tests:
- **Service tests**: JUnit 5 + Mockito (fast, isolated)
- **Controller tests**: `@WebMvcTest` + MockMvc (HTTP layer)
- **Repository tests**: `@DataJpaTest` (data access)
- **Integration tests**: `@SpringBootTest` + TestContainers (end-to-end)

### Step 6: Resume After a Break

If you close Claude Code and come back later:

```
/resume-task          # shows all tasks, picks up where you left off
/resume-mission       # resumes a specific mission mid-work
```

Full context is recovered from `progress-tracker.md` and mission docs.

### Step 7: Extend or Update

```
/extend-task          # add more missions to an existing task
/update-architecture  # update docs after making changes
```

### Typical Daily Workflow

```
/analyze-project         (once, at the start)
/create-task             (define what you want to build)
/create-mission          (execute mission 1)
/create-mission          (execute mission 2)
/create-mission          (execute mission 3)
/test-mission            (add tests)
/update-architecture     (keep docs in sync)
```

### All Available Commands

| Command | When to Use |
|---------|-------------|
| `/mehdi-ab-master` | See all available workflows at a glance |
| `/analyze-project` | First time setup - understand your codebase (7 agents) |
| `/analyze-backend` | Deep-dive into Spring Boot architecture only |
| `/create-task` | You have a new feature/fix/refactor to do |
| `/create-mission` | Execute the next mission in a task |
| `/resume-task` | Coming back after a break - pick up a task |
| `/resume-mission` | Coming back after a break - pick up a specific mission |
| `/extend-task` | Requirements changed - add missions to existing task |
| `/test-mission` | Generate comprehensive tests for completed work |
| `/update-architecture` | Codebase changed - update architecture docs |

## Slash Commands

| Command | Description |
|---------|-------------|
| `/mehdi-ab-master` | Master controller - lists all workflows |
| `/create-task` | Create a new task from a problem definition |
| `/create-mission` | Transform a task into focused missions |
| `/resume-task` | Resume a paused task |
| `/resume-mission` | Resume an incomplete mission |
| `/extend-task` | Add missions to an existing task |
| `/test-mission` | Create JUnit 5/Mockito/TestContainers tests |
| `/analyze-project` | Full project analysis (7 agents in parallel) |
| `/analyze-backend` | Deep Spring Boot backend analysis |
| `/update-architecture` | Update architecture documentation |

## Specialized Agents

| Agent | Model | Expertise |
|-------|-------|-----------|
| `spring-boot-architect` | sonnet | REST API, layered architecture, Spring MVC, auto-configuration |
| `jpa-data-architect` | sonnet | @Entity, JpaRepository, Flyway/Liquibase, N+1 detection |
| `spring-security-expert` | sonnet | SecurityFilterChain, JWT, OAuth2, @PreAuthorize |
| `junit-tester` | opus | JUnit 5, Mockito, @WebMvcTest, @DataJpaTest |
| `integration-tester` | opus | @SpringBootTest, TestContainers, RestAssured |
| `api-designer` | sonnet | OpenAPI/Swagger, DTOs, validation, HATEOAS |
| `docker-deployer` | sonnet | Multi-stage Docker, docker-compose, Kubernetes, Jib |
| `qa-code-auditor` | opus | SOLID principles, Spring Boot best practices, code quality |

## Architecture Documentation

When you run `/analyze-project`, up to 9 architecture documents are generated:

| Document | Contents |
|----------|----------|
| `tech-stack.md` | Java version, Spring Boot version, Maven/Gradle, dependencies |
| `entry-points.md` | REST endpoints via @RestController/@RequestMapping |
| `backend-patterns.md` | Controller/Service/Repository layer patterns |
| `data-patterns.md` | JPA entities, relationships, migration strategy |
| `security-patterns.md` | Spring Security config, auth method, protected endpoints |
| `external-services.md` | Third-party APIs, message brokers, cache |
| `project-constraints.md` | Technical limitations, Spring profiles |
| `testing-strategy.md` | JUnit 5, Mockito, test slices, TestContainers |
| `infrastructure.md` | Docker, K8s, CI/CD, deployment strategy |

## Workflow

### 1. Analyze Your Project
```
/analyze-project
```
Deploys 7 agents in parallel to create comprehensive architecture documentation.

### 2. Create a Task
```
/create-task
```
Define a problem, and mehdi-ab will:
- Analyze your existing codebase
- Assess task complexity (simple vs complex)
- Create a progress tracker with all missions defined upfront

### 3. Execute Missions
```
/create-mission
```
For complex tasks, missions follow entity-first order:
1. **Mission 1**: JPA entities + repositories + Flyway migration
2. **Mission 2**: Service layer + business logic
3. **Mission 3**: Controllers + DTOs + exception handling
4. **Mission 4**: Testing (JUnit 5, @WebMvcTest, @DataJpaTest, @SpringBootTest)

### 4. Test
```
/test-mission
```
Creates comprehensive tests using:
- **Unit tests**: JUnit 5 + Mockito for service isolation
- **Controller tests**: @WebMvcTest with MockMvc
- **Repository tests**: @DataJpaTest with embedded DB
- **Integration tests**: @SpringBootTest + TestContainers

### 5. Resume Anytime
```
/resume-task
/resume-mission
```
Pick up exactly where you left off with full context recovery.

## Task Types

| Type | Description | Example |
|------|-------------|---------|
| **Backend** | Spring Boot backend changes | New REST API, entity relationships, service logic |
| **Infrastructure** | Docker/K8s/CI-CD | Dockerfile, docker-compose, K8s manifests |
| **Planning** | Research & decisions | Technology evaluation, architecture design |

## How It Differs from ab-method

| Aspect | ab-method | mehdi-ab |
|--------|-----------|----------|
| Ecosystem | Next.js/React/TypeScript | Java Spring Boot |
| Scope | Full-stack (frontend + backend) | Backend-only |
| Config dir | `.ab-method/` | `.mehdi-ab/` |
| Commands | 11 (incl. analyze-frontend) | 10 (no frontend analysis) |
| Agents | 8 Next.js/React agents | 8 Spring Boot agents |
| Architecture docs | 7 files | 9 files (+data-patterns, security-patterns, infrastructure) |
| Test frameworks | Vitest, Playwright | JUnit 5, Mockito, TestContainers |
| Task ordering | Backend-first for full-stack | Entity-first for complex tasks |
| Mission types | Frontend/Backend/Planning | Backend/Infrastructure/Planning |

## File Structure

```
your-project/
  .mehdi-ab/
    structure/
      index.yaml              # Central path configuration
    core/
      analyze-project.md      # 7-agent orchestrator
      analyze-backend.md      # Spring Boot deep analysis
      create-task.md           # Task creation workflow
      create-mission.md        # Mission creation + agent deployment
      resume-task.md           # Task resumption
      resume-mission.md        # Mission resumption
      extend-task.md           # Add missions to existing task
      test-mission.md          # JUnit/Mockito/TestContainers testing
      update-architecture.md   # Architecture doc updates
    utils/
      backend-mission.md       # Spring Boot mission coordinator
      infrastructure-mission.md # Docker/K8s/CI-CD coordinator
      planning-mission.md      # Research & design decisions
  .claude/
    commands/                  # 10 slash commands
    agents/                    # 8 specialized agents
  docs/
    architecture/              # Up to 9 architecture docs
    tasks/                     # Task tracking and mission docs
```

## License

MIT - Based on [ab-method](https://github.com/ayoubben18/ab-method) by Ayoub.
