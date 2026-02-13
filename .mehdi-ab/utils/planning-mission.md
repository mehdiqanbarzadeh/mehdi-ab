# Planning Mission Utils

## Purpose
Guide planning missions that involve research, architecture decisions, or system design before implementation in Spring Boot projects.

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find architecture documentation paths.

## Architecture Loading

### 1. Read Structure Index
```yaml
Check .mehdi-ab/structure/index.yaml for:
- docs.architecture location
- All architecture files for comprehensive view
- project-constraints.md path
- external-services.md path
```

### 2. Load Comprehensive Architecture
Based on index.yaml paths, read ALL:
- **tech-stack.md** - Current technology choices (Java version, Spring Boot version, dependencies)
- **backend-patterns.md** - Controller/Service/Repository architecture
- **data-patterns.md** - JPA entities, relationships, migration strategy
- **security-patterns.md** - Authentication and authorization approach
- **project-constraints.md** - Limitations and requirements
- **external-services.md** - Third-party integrations
- **entry-points.md** - System boundaries and REST endpoints
- **infrastructure.md** - Docker, K8s, CI/CD setup

### 3. Identify Planning Needs
Determine planning type:
- **Technical Research** - New technology evaluation (e.g., caching solution, message broker)
- **Architecture Design** - System structure planning (e.g., microservice extraction, CQRS)
- **Integration Planning** - Third-party service integration (e.g., payment provider, email service)
- **Migration Planning** - Database migration, Spring Boot version upgrade, Java version upgrade
- **Performance Planning** - Query optimization, caching strategy, async processing

## Agent Coordination

### For Technical Research:
Deploy research-focused agent:
```
Task: "Research [technology/approach] for [mission]"
Context provided:
- Current tech stack (Java version, Spring Boot version, dependencies)
- Project constraints
- Existing patterns

Agent should:
1. Evaluate options against Spring Boot ecosystem compatibility
2. Compare with existing stack
3. Check Spring Boot starter availability
4. Document findings
5. Recommend approach
```

### For Architecture Design:
Deploy architecture-focused agent:
```
Task: "Design architecture for [feature/system]"
Context provided:
- All architecture docs
- System constraints
- Existing patterns

Agent should:
1. Analyze requirements against current layered architecture
2. Design component structure (entities, services, controllers)
3. Define package boundaries
4. Plan data flow
5. Document decisions
```

### For Integration Planning:
Deploy integration specialist:
```
Task: "Plan integration with [service]"
Context provided:
- External services doc
- Current integrations
- API patterns

Agent should:
1. Research service capabilities and SDK availability
2. Plan integration points (RestTemplate, WebClient, Feign)
3. Define data mapping between DTOs and external models
4. Security considerations (API keys, OAuth2 client)
5. Error handling and circuit breaker patterns (Resilience4j)
6. Document approach
```

## Mission Document Structure
For planning missions:
```markdown
# Mission N: Planning - [Description]

## Status
Current: Planning

## Research/Analysis
- Key findings
- Options evaluated
- Pros and cons

## Recommendations
- Proposed approach
- Architecture decisions
- Technology choices
- Spring Boot compatibility assessment

## Implementation Plan
- High-level steps
- Estimated complexity
- Dependencies (Maven/Gradle)

## Risks & Mitigations
- Identified risks
- Mitigation strategies
- Rollback plan

## Next Steps
- Follow-up missions needed
- Implementation approach
```

## Key Guidelines

### For All Planning Missions:
- Consider existing Spring Boot architecture
- Respect project constraints
- Evaluate impact on current layered architecture
- Plan for maintainability and testability
- Document decision rationale
- Check Spring Boot starter/auto-configuration availability

### Documentation Focus:
- WHY decisions were made
- Trade-offs considered (e.g., Spring Data JPA vs jOOQ, REST vs gRPC)
- Alternative approaches evaluated
- Future implications for scalability and maintenance

## Output Examples

### Technical Research Output:
```markdown
## Research: Caching Solutions for Spring Boot

### Options Evaluated:
1. Spring Cache with Caffeine - In-process, fast, simple
2. Spring Cache with Redis - Distributed, scalable, more infrastructure
3. Spring Cache with Ehcache - In-process, robust, JCache compatible

### Recommendation: Caffeine (single instance) / Redis (multi-instance)
- Caffeine fits current single-instance deployment
- Easy migration path to Redis when scaling
- Spring Boot auto-configuration available for both
- Minimal code changes with @Cacheable, @CacheEvict
```

### Architecture Design Output:
```markdown
## Architecture: Event-Driven Order Processing

### Components:
- OrderService with @TransactionalEventListener
- Spring ApplicationEventPublisher for domain events
- @Async event handlers for non-blocking processing
- Outbox pattern for reliable event delivery

### Data Flow:
Controller -> Service -> Entity (save) -> Event (publish) -> Listener (async process)
```

## Remember
- Planning missions inform future implementation
- Load ALL architecture docs for context
- Document decisions thoroughly
- Consider long-term implications for the Spring Boot ecosystem
- Check `.mehdi-ab/structure/index.yaml` for paths
