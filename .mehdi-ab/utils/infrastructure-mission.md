# Infrastructure Mission Utils

## Purpose
Guide infrastructure missions by loading architecture documentation and coordinating the docker-deployer agent. This covers Docker, Kubernetes, CI/CD pipelines, and deployment configuration for Spring Boot applications.

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find architecture documentation paths.

## Architecture Loading

### 1. Read Structure Index
```yaml
Check .mehdi-ab/structure/index.yaml for:
- docs.architecture location
- infrastructure.md path
- tech-stack.md path
- backend-patterns.md path
```

### 2. Load Relevant Architecture Docs
Based on index.yaml paths, read:
- **infrastructure.md** - Current Docker, K8s, CI/CD setup and deployment strategy
- **tech-stack.md** - Java version, Spring Boot version, Maven/Gradle, key dependencies
- **backend-patterns.md** - Application structure for containerization context

### 3. Extract Key Patterns
From architecture docs, identify:
- Build tool (Maven vs Gradle)
- Java version and distribution (Temurin, Corretto, etc.)
- Current containerization approach (Docker, Jib, Buildpacks)
- Database and external service dependencies
- Existing CI/CD pipeline configuration
- Spring profiles for different environments
- Actuator configuration for health probes

## Agent Coordination

### Phase 1: Architecture Planning
Deploy docker-deployer agent with context from architecture docs:
```
Task: "Plan infrastructure for [mission]"
Context provided:
- Current infrastructure from infrastructure.md
- Tech stack from tech-stack.md
- Application structure from backend-patterns.md

Agent should:
1. Analyze current infrastructure setup
2. Identify infrastructure components needed
3. Plan Docker configuration:
   - Multi-stage Dockerfile for Spring Boot
   - JVM memory settings for containers (-XX:MaxRAMPercentage)
   - Non-root user for security
   - Layered JAR extraction for optimal Docker layers
4. Plan service dependencies (docker-compose)
5. Plan Kubernetes resources if needed:
   - Deployment with resource limits for JVM
   - Liveness probe: /actuator/health/liveness
   - Readiness probe: /actuator/health/readiness
6. Document in mission file
```

### Phase 2: Implementation
Deploy docker-deployer agent with architecture plan:
```
Task: "Implement infrastructure for [mission]"
Context provided:
- Architecture plan from mission doc
- Existing infrastructure configuration

Agent should:
1. Implement planned infrastructure changes
2. Configure Spring Boot Actuator health endpoints
3. Set up proper JVM container settings
4. Update mission doc with progress
5. Mark completed items
```

## Key Guidelines

### Docker for Spring Boot:
- Use multi-stage builds (build + runtime stages)
- Extract layered JAR for optimal Docker caching:
  ```dockerfile
  FROM eclipse-temurin:21-jre-alpine AS runtime
  COPY --from=build /app/dependencies/ ./
  COPY --from=build /app/spring-boot-loader/ ./
  COPY --from=build /app/snapshot-dependencies/ ./
  COPY --from=build /app/application/ ./
  ```
- Set JVM container-aware memory: `-XX:MaxRAMPercentage=75.0`
- Use non-root user: `USER spring:spring`
- Health check: `HEALTHCHECK CMD curl -f http://localhost:8080/actuator/health || exit 1`

### Kubernetes for Spring Boot:
- Resource limits must account for JVM memory:
  ```yaml
  resources:
    requests:
      memory: "512Mi"
      cpu: "250m"
    limits:
      memory: "1Gi"
      cpu: "1000m"
  ```
- Use Spring Boot Actuator probes:
  ```yaml
  livenessProbe:
    httpGet:
      path: /actuator/health/liveness
      port: 8080
  readinessProbe:
    httpGet:
      path: /actuator/health/readiness
      port: 8080
  ```
- ConfigMap for application.yml overrides
- Secrets for sensitive configuration

### CI/CD for Spring Boot:
- Cache Maven/Gradle dependencies
- Run tests before building Docker image
- Use Jib for Docker builds without Docker daemon when appropriate
- Include database migration step in deployment pipeline

## Mission Document Updates
Ensure agents update these sections:
```markdown
## Architecture Plan
- Dockerfile: planned/in-progress/done
- docker-compose.yml: planned/in-progress/done
- CI/CD pipeline: planned/in-progress/done
- Kubernetes manifests: planned/in-progress/done

## Files Modified
- Dockerfile - Created
- docker-compose.yml - Created
- .github/workflows/build.yml - Created
- k8s/deployment.yml - Created
```

## Remember
- This utils file reads architecture docs
- Mission workflow delegates here
- docker-deployer agent gets context from this file
- Continuous updates to mission doc
- Check `.mehdi-ab/structure/index.yaml` for all paths
- Always consider JVM-specific container settings
