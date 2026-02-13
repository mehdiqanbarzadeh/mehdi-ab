# Analyze Project Workflow

## Purpose
Entry point orchestrator that deploys specialized subagents to analyze Spring Boot project architecture in parallel.

## Process

### 1. User Confirmation
Prompt the user with:
```
Project Architecture Analysis
=============================
I will deploy 7 specialized subagents to analyze your Spring Boot project in parallel:

1. Backend Architect Agent - Will analyze Spring Boot architecture, controllers, services, repositories
2. Data Architecture Agent - Will analyze JPA entities, relationships, and migration strategy
3. Tech Stack Analyzer - Will document Java version, Spring Boot version, Maven/Gradle, all dependencies
4. Entry Points Mapper - Will map all REST endpoints via @RestController/@RequestMapping
5. External Services Analyzer - Will identify third-party APIs, message brokers, cache integrations
6. Infrastructure Analyzer - Will analyze Docker, K8s, CI/CD, and deployment configuration
7. Testing Strategy Analyzer - Will document JUnit 5, test slices, TestContainers, and coverage

These agents will work simultaneously to create comprehensive architecture documentation.

Would you like to proceed with the full analysis, or prefer to analyze only specific parts?
- [1] Full Analysis (all 7 agents in parallel)
- [2] Backend Only (architecture + data)
- [3] Infrastructure Only (Docker/K8s/CI-CD)
```

### 2. Deploy Agents Based on Choice

#### Option 1: Full Analysis (Parallel Execution)
Deploy all agents simultaneously using Task tool:

```
Agents to deploy in parallel:
1. Task: "Analyze Backend Architecture"
   - subagent_type: "spring-boot-architect"
   - prompt: "Analyze the backend architecture following the workflow in .mehdi-ab/core/analyze-backend.md. Check .mehdi-ab/structure/index.yaml for output paths and create comprehensive backend-patterns.md documentation."

2. Task: "Analyze Data Architecture"
   - subagent_type: "jpa-data-architect"
   - prompt: "Analyze the data layer and create docs/architecture/data-patterns.md. Document all JPA entities, relationships, fetch strategies, custom queries, and migration strategy (Flyway/Liquibase). Check .mehdi-ab/structure/index.yaml for output paths."

3. Task: "Analyze Tech Stack"
   - subagent_type: "spring-boot-architect"
   - prompt: "Analyze the project's technology stack and create docs/architecture/tech-stack.md. Document Java version, Spring Boot version, build tool (Maven/Gradle), all Spring Boot starters, and third-party dependencies from pom.xml/build.gradle. Check .mehdi-ab/structure/index.yaml for output paths."

4. Task: "Analyze Entry Points"
   - subagent_type: "api-designer"
   - prompt: "Map all REST API entry points and create docs/architecture/entry-points.md. Document all @RestController classes, @RequestMapping paths, HTTP methods, request/response types, and authentication requirements. Check .mehdi-ab/structure/index.yaml for output paths."

5. Task: "Analyze External Services"
   - subagent_type: "spring-boot-architect"
   - prompt: "Identify all external services and create docs/architecture/external-services.md. Document RestTemplate/WebClient/Feign clients, Kafka/RabbitMQ listeners, Redis/cache configuration, S3/file storage, email services, and any third-party API integrations. Check .mehdi-ab/structure/index.yaml for output paths."

6. Task: "Analyze Infrastructure"
   - subagent_type: "docker-deployer"
   - prompt: "Analyze infrastructure setup and create docs/architecture/infrastructure.md. Document Dockerfile, docker-compose.yml, Kubernetes manifests, CI/CD pipelines, deployment strategy, Spring profiles, and Actuator configuration. Check .mehdi-ab/structure/index.yaml for output paths."

7. Task: "Analyze Testing Strategy"
   - subagent_type: "junit-tester"
   - prompt: "Analyze the project's testing strategy and create docs/architecture/testing-strategy.md. Document JUnit 5 configuration, test slices (@WebMvcTest, @DataJpaTest, @SpringBootTest), TestContainers usage, Mockito patterns, test profiles, coverage tools, and test commands (mvn test / gradle test). Check .mehdi-ab/structure/index.yaml for output paths."
```

Additionally, create these documentation files (can be done by any agent or manually):
- `docs/architecture/security-patterns.md` - Spring Security configuration, auth method, protected endpoints
- `docs/architecture/project-constraints.md` - Technical limitations, Spring profiles, environment requirements

#### Option 2: Backend Only
Deploy two agents:
- Task: "Analyze Backend Architecture" (spring-boot-architect)
- Task: "Analyze Data Architecture" (jpa-data-architect)

#### Option 3: Infrastructure Only
Deploy single agent:
- Task: "Analyze Infrastructure" (docker-deployer)

### 3. Post-Analysis
After agents complete their work:
1. Inform user that analysis is complete
2. List the documentation files created (up to 9 architecture docs)
3. Suggest next steps (e.g., review documentation, create tasks based on findings)

## Important Notes
- This workflow is **only an entry point** - it doesn't perform analysis itself
- All actual analysis work is delegated to specialized agents
- Agents work in parallel for maximum efficiency
- Each agent follows its own workflow (.mehdi-ab/core/analyze-backend.md for detailed backend analysis)
- Output paths are determined by `.mehdi-ab/structure/index.yaml`
