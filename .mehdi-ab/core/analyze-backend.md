# Analyze Backend Workflow

## Purpose
Deep analysis of Spring Boot backend architecture, services, and patterns to document the server-side structure.

## Important Configuration
**ALWAYS check `.mehdi-ab/structure/index.yaml` first** to determine where to save the output documentation. Do not assume paths - they are configurable by the user.

## Process

### 1. Initial Discovery
- Detect `@SpringBootApplication` annotated class (main entry point)
- Identify build tool: `pom.xml` (Maven) or `build.gradle`/`build.gradle.kts` (Gradle)
- Read `application.yml` / `application.properties` for configuration
- Identify Spring Boot version and Java version
- Check for Spring profiles (application-dev.yml, application-prod.yml, etc.)
- Locate Spring Boot starters in dependency list

### 2. Layer Architecture
- Map all `@RestController` classes and their request mappings
- Map all `@Service` classes and their responsibilities
- Map all `@Repository` interfaces and their custom queries
- Map all `@Configuration` classes and their bean definitions
- Identify `@Component` classes for cross-cutting concerns
- Document package organization (by feature vs by layer)

### 3. REST API Architecture
- Map all endpoints: `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping`
- Document URL patterns and path variables
- Identify request/response DTOs and their validation annotations (`@Valid`, `@NotNull`, etc.)
- Analyze `@ControllerAdvice` for global exception handling
- Check for API versioning strategy
- Document content types and media types

### 4. JPA/Data Layer
- Map all `@Entity` classes and their table mappings
- Document entity relationships: `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne`
- Identify fetch strategies (LAZY vs EAGER)
- Check for `JpaRepository` custom query methods and `@Query` annotations
- Identify migration strategy: Flyway (`db/migration/V*.sql`) or Liquibase (`db/changelog/`)
- Document database type from datasource configuration
- Check for Spring Data JPA auditing (`@CreatedDate`, `@LastModifiedDate`)

### 5. Spring Security
- Analyze `SecurityFilterChain` bean configuration
- Identify authentication method: JWT, OAuth2, Basic, Form-based
- Map `@PreAuthorize`, `@Secured`, `@RolesAllowed` annotations on methods
- Document protected vs public endpoints
- Check for custom security filters
- Identify user details service implementation

### 6. Service Architecture
- Document `@Transactional` usage and propagation settings
- Identify dependency injection pattern (constructor injection vs field injection)
- Map inter-service dependencies
- Check for domain events (`ApplicationEventPublisher`)
- Identify business logic patterns and validation

### 7. External Integrations
- RestTemplate / WebClient / Feign client usage for external API calls
- Message broker integration: Kafka (`@KafkaListener`), RabbitMQ (`@RabbitListener`)
- Cache integration: Redis, Caffeine, Ehcache (`@Cacheable`, `@CacheEvict`)
- File storage: S3, local filesystem
- Email service integration

### 8. Scheduled & Async Processing
- `@Scheduled` methods and cron expressions
- `@Async` methods and thread pool configuration
- `@EnableScheduling`, `@EnableAsync` configuration
- Background job processing patterns

### 9. Error Handling & Observability
- `@ControllerAdvice` and `@ExceptionHandler` patterns
- Custom exception hierarchy
- SLF4J/Logback logging configuration
- Spring Boot Actuator endpoints
- Metrics and health check configuration
- Distributed tracing setup (if any)

### 10. Testing Infrastructure
- JUnit 5 test configuration
- `@WebMvcTest` controller tests
- `@DataJpaTest` repository tests
- `@SpringBootTest` integration tests
- TestContainers configuration
- Test profiles and properties
- Mock patterns (Mockito, @MockBean)

## Output

### Location
Check `.mehdi-ab/structure/index.yaml` for the output path. The workflow_outputs section will specify where to save the backend analysis results.

### backend-patterns.md Structure:
```markdown
# Backend Architecture

## Framework & Runtime
- Spring Boot version
- Java version
- Build tool (Maven/Gradle)
- Key dependencies and starters

## Layered Architecture
- Package organization (by feature / by layer)
- Controller layer patterns
- Service layer patterns
- Repository layer patterns
- Configuration classes

## REST API Design
- API style and conventions
- Endpoint organization
- Request/Response DTO patterns
- Validation approach
- Exception handling strategy

## Data Layer
- Database type and driver
- JPA entity patterns
- Repository query patterns
- Migration strategy (Flyway/Liquibase)
- Caching strategy

## Authentication & Security
- Auth implementation (JWT/OAuth2/Session)
- Security filter chain configuration
- Method-level security
- CORS and CSRF configuration

## Service Architecture
- Transaction management
- Dependency injection patterns
- Inter-service communication
- Event-driven patterns

## External Services
- Third-party API integrations
- Message broker usage
- Cache layers
- File storage

## Background Processing
- Scheduled tasks
- Async processing
- Thread pool configuration

## Observability
- Logging configuration
- Actuator endpoints
- Metrics and health checks

## Testing Infrastructure
- Test frameworks and tools
- Test slice usage
- Mock patterns
- Test data management
```

## Key Files to Analyze
- pom.xml / build.gradle
- Application main class (@SpringBootApplication)
- application.yml / application.properties
- SecurityConfig / WebSecurityConfig
- All @RestController classes
- All @Entity classes
- All @Repository interfaces
- All @Service classes
- All @Configuration classes
- Flyway/Liquibase migration files
- Test configuration files
- Dockerfile / docker-compose.yml
