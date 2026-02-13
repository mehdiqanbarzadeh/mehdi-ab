# Analyze Backend

## Description
Deep analysis of Spring Boot backend architecture including controllers, services, repositories, entities, security, and testing infrastructure.

## Usage
```
/analyze-backend
```

## Behavior
Loads and executes the analyze-backend workflow from `.mehdi-ab/core/analyze-backend.md`

This workflow will:
1. Analyze Spring Boot layered architecture (@RestController, @Service, @Repository)
2. Document JPA entities, relationships, and data access patterns
3. Understand Spring Security configuration and authentication
4. Identify external integrations (REST clients, message brokers, cache)
5. Document testing infrastructure (JUnit 5, test slices, TestContainers)

## Workflow Details
The analyze-backend workflow examines 10 key areas:
- **Initial Discovery** - @SpringBootApplication, pom.xml/build.gradle, application.yml
- **Layer Architecture** - Controllers, Services, Repositories, Configuration
- **REST API** - Endpoints, DTOs, validation, exception handling
- **JPA/Data** - Entities, relationships, Flyway/Liquibase
- **Spring Security** - SecurityFilterChain, JWT/OAuth2, method security
- **Service Architecture** - @Transactional, dependency injection, events
- **External Integrations** - RestTemplate/WebClient, Kafka/RabbitMQ, Redis
- **Scheduled/Async** - @Scheduled, @Async, thread pools
- **Error Handling & Observability** - @ControllerAdvice, Actuator, logging
- **Testing** - JUnit 5, @WebMvcTest, @DataJpaTest, @SpringBootTest, TestContainers

## Examples
```
/analyze-backend
# Analyzes Spring Boot backend architecture in depth
# Documents all layers, patterns, and integrations
# Creates backend-specific technical documentation
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master analyze-backend
```
