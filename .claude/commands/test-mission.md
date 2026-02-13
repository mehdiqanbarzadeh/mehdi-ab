# Test Mission

## Description
Create comprehensive tests for implemented Spring Boot features using JUnit 5, Mockito, and TestContainers, ensuring quality and reliability of completed missions.

## Usage
```
/test-mission
```

## Behavior
Loads and executes the test-mission workflow from `.mehdi-ab/core/test-mission.md`

This workflow will:
1. Analyze completed missions and implemented features
2. Design comprehensive testing strategies per layer
3. Create unit tests (JUnit 5 + Mockito), controller tests (@WebMvcTest), repository tests (@DataJpaTest)
4. Create integration tests (@SpringBootTest + TestContainers)
5. Validate feature functionality and edge cases

## Workflow Details
The test-mission workflow provides:
- **Test Strategy** - Layer-appropriate testing approach based on implemented features
- **Unit Tests** - JUnit 5 with Mockito for service layer isolation
- **Controller Tests** - @WebMvcTest with MockMvc for REST API validation
- **Repository Tests** - @DataJpaTest for data access verification
- **Integration Tests** - @SpringBootTest with TestContainers for end-to-end validation
- **Coverage Analysis** - Measuring and improving test coverage with JaCoCo

## Examples
```
/test-mission
# Analyzes completed features and creates comprehensive Spring Boot tests
# Implements layer-appropriate testing strategies
# Sets up JUnit 5, Mockito, and TestContainers test suites
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master test-mission
```
