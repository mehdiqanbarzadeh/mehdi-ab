# Backend Mission Utils

## Purpose
Guide backend missions by loading architecture documentation and coordinating Spring Boot agents.

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find architecture documentation paths.

## Architecture Loading

### 1. Read Structure Index
```yaml
Check .mehdi-ab/structure/index.yaml for:
- docs.architecture location
- backend-patterns.md path
- data-patterns.md path
- tech-stack.md path
- external-services.md path
```

### 2. Load Relevant Architecture Docs
Based on index.yaml paths, read:
- **backend-patterns.md** - Current Controller/Service/Repository architecture, Spring Boot patterns
- **data-patterns.md** - JPA entities, relationships, migration strategy
- **tech-stack.md** - Spring Boot version, Java version, Maven/Gradle, dependencies
- **entry-points.md** - Existing REST endpoints via @RestController/@RequestMapping
- **external-services.md** - Third-party APIs, message brokers, cache integrations

### 3. Extract Key Patterns
From architecture docs, identify:
- Layered architecture style (Controller/Service/Repository)
- Database approach (Spring Data JPA, Flyway/Liquibase)
- Authentication method (JWT, OAuth2, Session)
- Package organization pattern (by feature vs by layer)
- DTO mapping approach (MapStruct, manual, ModelMapper)

## Agent Coordination

### Phase 1: Spring Boot Architect Agent
Deploy with context from architecture docs:
```
Task: "Plan backend architecture for [mission]"
Context provided:
- Current patterns from backend-patterns.md
- Data patterns from data-patterns.md
- Tech stack from tech-stack.md
- Existing endpoints from entry-points.md

Agent should:
1. Analyze current Spring Boot architecture
2. Define files to create/modify (controllers, services, repositories, entities)
3. Create DTOs using entity field types
4. Plan layered implementation order: Entity -> Repository -> Service -> Controller
5. Document in mission file
```

### Phase 2: Specialized Agent Deployment
Deploy appropriate specialized agent based on mission needs:
- For JPA/data work: jpa-data-architect
- For REST API design: api-designer
- For security: spring-security-expert
- For general backend: spring-boot-architect

```
Task: "Implement backend for [mission]"
Context provided:
- Architecture plan from mission doc
- Code style from existing files

Agent should:
1. Implement planned changes following Spring Boot conventions
2. Update mission doc with progress
3. Mark completed items
```

## Key Guidelines for Agents

### For Spring Boot Architect:
- Follow existing package organization
- Use constructor injection (not field injection)
- Follow existing DTO patterns
- Plan for reusability across services
- Check existing dependencies in pom.xml/build.gradle before suggesting new ones

### For Implementation Agents:
- Update mission status: In dev -> Testing -> Completed
- Mark each completed item in architecture plan
- Document all file changes
- Update progress tracker
- Follow Spring Boot layer conventions:
  - `@RestController` classes in controller/web package
  - `@Service` classes in service package
  - `@Repository` interfaces in repository/dao package
  - `@Entity` classes in entity/model/domain package
  - DTOs in dto package

## Mission Document Updates
Ensure agents update these sections:
```markdown
## Architecture Plan
- Entity layer: planned/in-progress/done
- Repository layer: planned/in-progress/done
- Service layer: planned/in-progress/done
- Controller layer: planned/in-progress/done
- DTOs & Validation: planned/in-progress/done

## Files Modified
- src/main/java/.../entity/Order.java - Created
- src/main/java/.../repository/OrderRepository.java - Created
- src/main/java/.../service/OrderService.java - In progress
- src/main/resources/db/migration/V2__create_orders.sql - Created
```

## Remember
- This utils file reads architecture docs
- Mission workflow delegates here
- Agents get context from this file
- Continuous updates to mission doc
- Check `.mehdi-ab/structure/index.yaml` for all paths
- Always follow entity-first approach: Entity -> Repository -> Service -> Controller
