# Extend Task Workflow

## Purpose
Add new missions to an existing task after initial missions have been completed. This is useful when:
- Requirements change during development
- New features need to be added to an ongoing task
- Additional functionality is discovered after initial planning
- User wants to expand the scope of a task

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find where task documents are stored.

## Process

### 1. Identify Task to Extend
Ask user: "Which task would you like to extend? Please provide the task name."

### 2. Locate and Review Task Progress
Based on `.mehdi-ab/structure/index.yaml`, find and read:
```
tasks/[task-name]/
  progress-tracker.md
  mission-*.md (all existing missions)
```

### 3. Display Current Task State
Show user the current task status:
```
Extending Task: [Task Name]
========================
Task Status: [Current Status]

Current Missions:
- Mission 1: [Name] - COMPLETED
- Mission 2: [Name] - COMPLETED
- Mission 3: [Name] - [Status]
- Mission 4: [Name] - [Status]

[Show mission summaries from progress tracker if available]
```

### 4. Gather New Mission Requirements
Ask user: "What new missions would you like to add to this task? Please describe what needs to be accomplished."

**If user provides clear instructions:**
- Follow them exactly
- Create missions based on their description
- Don't ask unnecessary clarifying questions

**If user's description is vague:**
- Ask clarifying questions similar to create-mission workflow:
  - "What specific functionality should be working when this mission is complete?"
  - "What should I be able to test or demo after this mission?"
  - For backend: "Which specific API endpoints or entities need to be created/modified?"
  - For infrastructure: "What infrastructure components need to be added/modified?"

### 5. Determine Mission Numbers
Check existing missions in progress tracker to determine the next mission number:
- If Mission 4 is the last -> New missions start at Mission 5
- Ensure sequential numbering

### 6. Create New Mission Documents
For each new mission, create `mission-N-[description].md` in the task folder following the same format as create-mission workflow.

### 7. Update Progress Tracker
Add new missions to the progress tracker:

```markdown
## Missions
- [x] Mission 1: [Name] - COMPLETED
- [x] Mission 2: [Name] - COMPLETED
- [ ] Mission 3: [Name] - [Status]
- [ ] Mission 4: [Name] - [Status]
- [ ] Mission 5: [New Mission Name] - Brainstormed  <- NEW
- [ ] Mission 6: [New Mission Name] - Brainstormed  <- NEW
```

### 8. Update Task Status
If task was marked as "Completed", change status to "In dev" or "Validated" (depending on whether missions are validated).

### 9. Validate Before Proceeding
Show user summary of new missions and ask for confirmation.

### 10. Load Context for New Missions
**CRITICAL: Read mission summaries from progress tracker** to understand what was built in previous missions:
- Use completed mission summaries for context
- Only read full mission docs if summaries insufficient
- Gather architecture context similar to create-mission workflow

### 11. Determine Mission Types
Based on requirements, determine mission types:
- **Backend Mission** -> Will use `.mehdi-ab/utils/backend-mission.md`
- **Infrastructure Mission** -> Will use `.mehdi-ab/utils/infrastructure-mission.md`
- **Planning Mission** -> Will use `.mehdi-ab/utils/planning-mission.md`

### 12. Load Utils Files and Architecture Context
For each new mission:
1. Read the relevant utils file
2. Check `.mehdi-ab/structure/index.yaml` for architecture doc paths
3. Load relevant architecture documentation as specified by utils file
4. Use context from previous missions (from summaries)

### 13. Enhance Mission Documents with Context
Update mission documents with:
- Dependencies from previous missions
- Integration points with existing code
- Patterns to follow from architecture docs
- Technical constraints from previous work

## Key Principles
- **Respect user instructions** - If user is clear, follow exactly what they said
- **Maintain context** - Use previous mission summaries to understand what exists
- **Sequential numbering** - Ensure missions are numbered correctly
- **Update status** - Change task status appropriately when extending
- **Validation checkpoint** - User should validate new missions before implementation
- **Read summaries first** - Check progress tracker mission summaries before reading full docs
- **One mission at a time** - Complete missions sequentially, even when extending

## Important Notes
- Always check `.mehdi-ab/structure/index.yaml` for paths
- Use mission summaries from progress tracker for context
- Only read full mission docs if summaries insufficient
- Maintain sequential mission numbering
- Update task status when extending completed tasks
- Follow same mission creation pattern as create-mission workflow

## Remember
- Always ask for task name if not provided
- Show current mission progress before extending
- Use mission summaries for context, not full docs
- Maintain sequential mission numbering
- Update task status appropriately
- Follow create-mission pattern for mission creation
- Validate new missions before implementation
