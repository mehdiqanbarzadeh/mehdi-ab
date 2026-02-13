# Analyze Project

## Description
Complete Spring Boot project structure analysis to understand architecture, patterns, and technical stack for effective task planning.

## Usage
```
/analyze-project
```

## Behavior
Loads and executes the analyze-project workflow from `.mehdi-ab/core/analyze-project.md`

This workflow will:
1. Deploy 7 specialized agents in parallel to analyze the Spring Boot project
2. Document technology stack (Java version, Spring Boot version, Maven/Gradle, dependencies)
3. Identify Spring Boot patterns and conventions
4. Create comprehensive architecture documentation (up to 9 files)
5. Extract technical constraints and requirements

## Workflow Details
The analyze-project workflow deploys these agents in parallel:
- **Backend Architect** - Spring Boot architecture analysis
- **Data Architect** - JPA entities, relationships, migration strategy
- **Tech Stack Analyzer** - Java/Spring Boot version, dependencies
- **Entry Points Mapper** - REST endpoints via @RestController
- **External Services** - Third-party APIs, message brokers, cache
- **Infrastructure** - Docker, K8s, CI/CD analysis
- **Testing Strategy** - JUnit 5, test slices, TestContainers

## Examples
```
/analyze-project
# Performs complete Spring Boot project analysis
# Creates comprehensive architecture documentation
# Documents tech stack, patterns, and constraints for future tasks
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master analyze-project
```
