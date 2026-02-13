# Resume Mission Workflow

## Purpose
Resume an in-progress mission from exactly where it was paused, maintaining context and continuing implementation.

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find task and mission document locations.

## Process

### 1. Identify Task and Mission
Ask user: "Which task and mission would you like to resume? Please provide the task name and mission number."

### 2. Load Context
Based on `.mehdi-ab/structure/index.yaml`, read:
- `tasks/[task-name]/progress-tracker.md` - Overall task status
- `tasks/[task-name]/mission-N-[description].md` - Specific mission document
- Previous mission files - For dependencies and context

### 3. Analyze Mission State
From mission document, identify:
- **Current Status**: Brainstormed/Validated/In dev/Testing/Completed
- **Architecture Plan**: What's been planned (if any)
- **Implementation Progress**: What's been done, what remains
- **Files Modified**: Track changes already made
- **Last Action**: Where we stopped

### 4. Display Resume Context
Show user:
```
Resuming Mission N: [Description]
========================
Task: [Task Name]
Mission Status: [In dev]

Progress:
- Architecture plan created
- Entity layer implemented
- Service layer - 2 of 4 completed
- Controller layer pending
- Testing pending

Last action: Created OrderService with createOrder method
Next step: Implement updateOrder and deleteOrder methods

Ready to continue?
```

### 5. Resume Based on Status

#### If Status: Brainstormed
- Prompt user to validate before continuing
- "Mission is in Brainstormed status. Please review and validate to proceed."

#### If Status: Validated
- Determine mission type (backend/infrastructure/planning)
- Load appropriate utils file
- Start Phase 1 (Architecture) where appropriate

#### If Status: In dev
- Check which phase (Architecture or Implementation)
- Load appropriate utils file and agent
- Continue from exact breakpoint marked in mission doc

#### If Status: Testing
- Run remaining tests
- Fix any failures
- Complete validation

### 6. Continue Mission Execution

#### For Backend Mission in Progress:
Load `.mehdi-ab/utils/backend-mission.md` and:
- If entity/repository work incomplete -> Resume with jpa-data-architect agent
- If service layer incomplete -> Resume with spring-boot-architect agent
- If controller/API incomplete -> Resume with api-designer agent
- If security incomplete -> Resume with spring-security-expert agent
- Check mission doc for specific breakpoints

#### For Infrastructure Mission in Progress:
Load `.mehdi-ab/utils/infrastructure-mission.md` and:
- If Docker config incomplete -> Resume with docker-deployer agent
- If K8s config incomplete -> Resume with docker-deployer agent
- If CI/CD incomplete -> Resume with docker-deployer agent
- Check mission doc for specific breakpoints

### 7. Update Progress Continuously
As work resumes, update:
- Mission document sections
- Progress tracker
- Mark completed items
- Update "Last action" and "Next step"

### 8. Handle Blockers
If mission was blocked:
- Review blocker notes in mission doc
- Ask user for clarification if needed
- Document resolution
- Continue from unblocked point

## Status Recovery Guide

```markdown
## Mission Status Reference
- Brainstormed -> Need validation
- Validated -> Start architecture phase
- In dev -> Check phase and continue
- Testing -> Run tests and validate
- Completed -> Mission done, check next
```

## Example Resume Flow

1. User: "Resume mission"
2. System: "Which task and mission to resume?"
3. User: "order-management, mission 2"
4. System: Reads mission-2-service-layer.md
5. System: "Mission 2 is In dev, service layer 60% complete. Ready to continue?"
6. User: "Yes"
7. System: Loads backend-mission.md utils
8. System: Resumes with spring-boot-architect agent from breakpoint

## Important Notes
- Always show current state before resuming
- Mission reads utils, utils read architecture docs
- Continue from exact breakpoint, don't repeat work
- Update documents in real-time
- Handle interrupted phases gracefully

## Remember
- Ask for task and mission if not provided
- Check `.mehdi-ab/structure/index.yaml` for paths
- Read mission document for exact state
- Delegate to appropriate utils file
- Maintain continuity from pause point
