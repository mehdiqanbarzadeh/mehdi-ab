# Test Mission Workflow

## Purpose
Create comprehensive tests for implemented Spring Boot features by analyzing the codebase and following the project's testing strategy. This workflow is typically run when implementation missions reach "Testing" status.

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find task and documentation locations.

## Process

### 1. Identify Task and Implementations
Ask user: "Which task are we creating tests for? Please provide the task name."

### 2. Load Task Context
Based on `.mehdi-ab/structure/index.yaml`, read from task folder:
- `progress-tracker.md` - See what has been implemented
- All completed mission files - Understand what was built
- Identify files that were created/modified

### 3. Load Testing Strategy
**CRITICAL: Read testing-strategy.md to understand project's testing approach:**
1. **Check `.mehdi-ab/structure/index.yaml`** for testing-strategy.md location
2. **Read `testing-strategy.md`** to understand:
   - JUnit 5 configuration and extensions
   - Test slices in use (@WebMvcTest, @DataJpaTest, @SpringBootTest)
   - Mockito patterns and @MockBean usage
   - TestContainers configuration
   - Test profiles (application-test.yml)
   - Test commands (mvn test, gradle test)
   - Coverage requirements and tools (JaCoCo)
   - Existing test examples and patterns

### 4. Analyze Implementation
**Review what needs testing from completed missions:**
1. **Controller layer**:
   - REST endpoints created/modified
   - Request validation (@Valid, custom validators)
   - Response DTOs and status codes
   - Exception handling via @ControllerAdvice

2. **Service layer**:
   - Business logic methods
   - Transaction management
   - Service-to-service interactions
   - Edge cases and error conditions

3. **Repository layer**:
   - Custom query methods
   - JPQL/native queries
   - Specification/Criteria queries
   - Pagination and sorting

4. **Integration points**:
   - Full API flow (Controller -> Service -> Repository)
   - External service calls
   - Security (authentication/authorization)
   - Database operations end-to-end

### 5. Search for Existing Test Patterns
**Find and analyze existing tests in the codebase:**
- Search for test files matching src/test/java patterns
- Understand test structure and conventions
- Identify reusable test utilities and builders
- Find mock/stub patterns
- Check for TestContainers base test classes

### 6. Create Test Mission Document
Create `mission-N-test-[description].md` in task folder:
```markdown
# Mission N: Test - [Description]

## Status
Current: Brainstormed

## Test Scope
[What implementations are being tested]

## Testing Strategy
- Framework: JUnit 5
- Mocking: Mockito / @MockBean
- Test slices: @WebMvcTest, @DataJpaTest
- Integration: @SpringBootTest with TestContainers
- Coverage target: [From requirements]

## Test Plan
(To be filled by test architect)

## Implementation
(To be filled during test creation)

## Files Created/Modified
(Updated during development)

## Test Results
(Test execution results)
```

### 7. Validate Before Proceeding
**CRITICAL: Always prompt user before implementation:**
```
Test Mission document created and status is 'Brainstormed'.
Testing scope includes: [list implementations to test]
Using JUnit 5 with Mockito and [test slices].
Ready to proceed with test creation?
```

Wait for user confirmation before continuing.

### 8. Execute Test Mission

**Phase 1: Test Architecture (junit-tester agent)**
Deploy with gathered context:
```
Task: "Plan test coverage for [implementations]"
Context provided:
- Testing strategy from testing-strategy.md
- Implemented features from previous missions
- Existing test patterns from codebase
- Files that need testing

Agent should:
1. Identify all testable units per layer
2. Plan test file structure matching project conventions
3. Define test scenarios (happy path + error cases)
4. Determine mock requirements (@MockBean, @Mock)
5. Plan test slices (@WebMvcTest for controllers, @DataJpaTest for repos)
6. Document test plan in mission file
```

**Phase 2: Unit Test Implementation (junit-tester agent)**
Deploy with test plan:
```
Task: "Implement unit tests for [implementations]"
Agent should:
1. Create @WebMvcTest tests for controllers (MockMvc + @MockBean)
2. Create @DataJpaTest tests for repositories (embedded DB)
3. Create plain JUnit 5 + Mockito tests for services
4. Use AssertJ for fluent assertions
5. Use @DisplayName for readable test names
6. Use @ParameterizedTest where beneficial
```

**Phase 3: Integration Test Implementation (integration-tester agent)**
Deploy with test plan:
```
Task: "Implement integration tests for [implementations]"
Agent should:
1. Create @SpringBootTest tests with TestContainers
2. Test full API flow with TestRestTemplate or MockMvc
3. Verify database operations with real database
4. Test security with @WithMockUser or JWT tokens
5. Verify error handling end-to-end
6. Run tests and ensure all passing
```

### 9. Update Progress Throughout

**Mission Status Flow:**
- Brainstormed -> Created, awaiting validation
- Validated -> Ready for test creation
- In dev -> Actively writing tests
- Testing -> Running test suite
- Completed -> All tests passing

### 10. Mission Completion
When all tests are complete:
1. Run full test suite (mvn test / gradle test)
2. Verify coverage meets requirements
3. Update mission status to "Completed"
4. Update progress tracker
5. Document final coverage metrics
6. Update original implementation missions from "Testing" to "Completed"

## Key Principles
- **Always load testing-strategy.md first** - Understand project's approach
- **Test what was actually built** - Focus on new implementations
- **Follow existing patterns** - Match test style and structure
- **Layer-appropriate tests** - @WebMvcTest for controllers, @DataJpaTest for repos, plain Mockito for services
- **Comprehensive coverage** - Unit, integration, and security tests
- **Fast feedback** - Unit tests should run fast, integration tests with TestContainers

## Test Types to Create

### Unit Tests (JUnit 5 + Mockito)
- Service methods with mocked dependencies
- Validation logic
- Edge cases and error conditions
- Pure business logic

### Controller Tests (@WebMvcTest)
- Request mapping and HTTP methods
- Request validation (@Valid)
- Response DTOs and status codes
- Exception handling
- Content type negotiation

### Repository Tests (@DataJpaTest)
- Custom query methods
- Entity constraints and mappings
- Pagination and sorting
- Cascade operations

### Integration Tests (@SpringBootTest + TestContainers)
- Full API flow
- Database operations end-to-end
- Security integration
- Transaction behavior
- Cross-service interactions

## Remember
- Check `.mehdi-ab/structure/index.yaml` for paths
- Load testing-strategy.md before creating any tests
- Analyze actual implementations from completed missions
- Follow project's existing test patterns
- Ensure tests actually run and pass
- Update coverage metrics
