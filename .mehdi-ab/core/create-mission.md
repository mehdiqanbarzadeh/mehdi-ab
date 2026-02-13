# Create Mission Workflow

## Purpose
Execute one mission at a time, completing it entirely before moving to the next. Each mission uses specialized subagents for architecture and implementation.

## Core Behavior
**RESPECT USER INSTRUCTIONS AND KEEP IT SIMPLE:**
- If user provides clear instructions -> Follow them exactly, don't ask unnecessary questions
- Only ask when something is genuinely unclear or ambiguous
- Don't overcomplicate simple requests
- Trust the user knows what they want

## Critical Step
**ALWAYS check `.mehdi-ab/structure/index.yaml` FIRST** to find task and mission document locations.

## Process

### 1. Identify Task and Current Context
**CRITICAL: If user provides clear, specific instructions, follow them exactly. Only ask questions if something is genuinely unclear.**

#### Initial Questions:
Ask user: "Which task are we creating a mission for? Please provide the task name."

#### Context Loading:
Based on `.mehdi-ab/structure/index.yaml`, read from task folder:
1. **Read `progress-tracker.md` first** - Check mission summaries section for completed missions
2. **Check Mission Summaries** in progress tracker:
   - If summaries provide clear technical context -> Use them
   - If summaries are unclear or missing details -> Read full mission docs
3. **Only read full mission files** if summaries insufficient

#### Check User's Instructions First:
From progress tracker, identify the next uncompleted mission.

**If the user already provided specific, clear instructions in the progress tracker or their message:**
- Proceed directly to Step 3
- DO NOT ask unnecessary clarifying questions
- Trust the user knows what they want

**Only ask clarifying questions if:**
- The mission description is genuinely vague or ambiguous
- Critical technical details are missing
- There's a conflict or contradiction in requirements

#### Mission Clarification (Only when unclear):

**If mission description is vague**, ask:
- "Can you describe exactly what needs to be built in this mission?"
- "What specific functionality should be working when this mission is complete?"
- "What should I be able to test or demo after this mission?"

**For Backend missions**, ask:
- "Which specific API endpoints need to be created/modified?"
- "What JPA entities or database changes are required?"
- "Should this follow existing patterns in the codebase? Which ones?"
- "What validation rules apply?"
- "Are there specific exception handling requirements?"

**For Infrastructure missions**, ask:
- "What infrastructure components need to be created/modified?"
- "What environments should this target (dev/staging/prod)?"
- "Are there specific resource constraints?"

**For Planning/Research missions**, ask:
- "What specific decision needs to be made?"
- "What are the key criteria for evaluation?"
- "Are there specific technologies/approaches to compare?"

#### Proceed When:
- User provided clear instructions -> Follow them exactly
- OR all genuine ambiguities have been resolved

### 3. Determine Mission Type
Based on clarified requirements, determine mission type:
- **Backend Mission** -> Will use `.mehdi-ab/utils/backend-mission.md`
- **Infrastructure Mission** -> Will use `.mehdi-ab/utils/infrastructure-mission.md`
- **Planning Mission** -> Will use `.mehdi-ab/utils/planning-mission.md`

### 4. Load Utils File and Gather Context
**CRITICAL: Read the appropriate utils file FIRST to understand what context is needed:**

1. **Read the relevant utils file** (backend-mission.md, infrastructure-mission.md, or planning-mission.md)
2. **Check `.mehdi-ab/structure/index.yaml`** to find where architecture docs are located
3. **Based on the utils file guidance**, read the architecture files that are relevant for this mission type:
   - The utils file will specify which architecture docs to load
   - Use paths from index.yaml, don't hardcode them
   - Gather patterns, tech stack, and existing implementations as specified by utils

### 5. Create Mission Document
Create `mission-N-[description].md` in task folder with **DETAILED REQUIREMENTS** from Step 1:
```markdown
# Mission N: [Description]

## Status
Current: Brainstormed

## Objective
[SPECIFIC objective from user clarification - not generic]

## Detailed Requirements
[ALL clarified requirements from interactive gathering]

### Acceptance Criteria
- [ ] [Specific testable outcome 1]
- [ ] [Specific testable outcome 2]
- [ ] [Specific testable outcome 3]

### Technical Specifications
- **Files to Create/Modify**: [Specific file paths from clarification]
- **Patterns to Follow**: [Existing patterns user specified]
- **Integration Points**: [How this connects to other parts]
- **Constraints**: [Any limitations or requirements]

## Dependencies
- Previous missions: [What we're building on]
- External: [Spring Boot starters, libraries, etc.]

## Architecture Plan
(To be filled by architect agent)

## Implementation
(To be filled by developer agent)

## Files Modified
(Updated during development)

## Testing
(Test results and validation)
```

### 6. Validate Before Proceeding
**CRITICAL: Always prompt user with SPECIFIC details before implementation:**
```
Mission N document created with the following plan:

## Summary:
- **Objective**: [Repeat the specific objective]
- **Key Files**: [List the files that will be created/modified]
- **Patterns**: [Existing patterns that will be followed]
- **Acceptance Criteria**: [List the specific outcomes]

## Next Steps:
I will deploy [specific agents] to:
1. [Phase 1 description with specific agent]
2. [Phase 2 description with specific agent]

Does this plan accurately capture what you want for this mission?
If anything is unclear or needs adjustment, please let me know now.

Ready to move from 'Brainstormed' to 'Validated' status and proceed with implementation?
```

**Do NOT proceed until user explicitly confirms the plan is correct.**

### 7. Execute Mission Based on Type

**CRITICAL: Assess if subagents are needed before deploying**

#### When to Skip Subagents (Direct Implementation):
**Implement directly WITHOUT subagents when:**
- Implementation is straightforward and follows existing patterns
- You have all necessary context (from summaries, utils, architecture docs)
- Changes are simple/incremental (adding field, fixing bug, small feature)
- Clear example exists in codebase to follow
- No complex architecture decisions needed

#### When to Use Subagents:
**Deploy subagents when:**
- Complex architecture decisions needed
- Multiple approaches possible, need expert recommendation
- Large/complex implementation requiring specialized knowledge
- Specialized testing or QA needed
- Working with unfamiliar technology or pattern

**Use the context gathered in Step 4 to guide intelligent agent deployment:**

#### For Backend Mission:

**Phase 1: Architecture Planning** (Only if needed)
Deploy available Spring Boot agents (spring-boot-architect, jpa-data-architect, api-designer, spring-security-expert):
- Provide architecture patterns loaded in Step 4
- Include tech stack information
- Share existing endpoints and services
- Agent creates detailed architecture plan
- **Agent Output**: Creates `sub-agents-outputs/[agent-name]-architecture-[timestamp].md`

**Phase 2: Implementation**
Deploy specialized implementation agents based on mission needs:
- For entity/data work: jpa-data-architect
- For REST API: spring-boot-architect or api-designer
- For security: spring-security-expert
- For testing: junit-tester or integration-tester
- **Agent Output**: Each agent creates `sub-agents-outputs/[agent-name]-implementation-[timestamp].md`

#### For Infrastructure Mission:

**Phase 1: Infrastructure Planning** (Only if needed)
Deploy docker-deployer agent:
- Provide infrastructure docs loaded in Step 4
- Include tech stack and application structure
- **Agent Output**: Creates `sub-agents-outputs/docker-deployer-architecture-[timestamp].md`

**Phase 2: Implementation**
Deploy docker-deployer agent with architecture plan

#### For Planning Mission:

**Research/Analysis** (Only if needed)
Deploy research and analysis agents (general-purpose, qa-code-auditor):
- **Agent Output**: Creates `sub-agents-outputs/[agent-name]-analysis-[timestamp].md`

### 7.1 Agent Output Management
**After each agent completes its work:**

1. **Create Agent Output Document** in `sub-agents-outputs/[agent-name]-[action]-[timestamp].md`
2. **Update Mission Document** with agent summary
3. **Update Progress Tracker** with agent usage

### 8. Update Progress Throughout

**Mission Status Flow:**
- Brainstormed -> Created, awaiting validation
- Validated -> Ready for implementation
- In dev -> Actively developing
- Testing -> Running tests
- Completed -> Mission done

### 9. Mission Completion
When mission is fully complete:

#### 1. Update Mission Document
- Set status to "Completed"
- Fill all sections (Architecture Plan, Implementation, Testing)

#### 2. Add Mission Summary to Progress Tracker
**CRITICAL: Add technical summary for next missions to reference**

Update progress tracker with:
```markdown
## Mission Summaries
### Mission N: [Description]
**Status**: Completed
**Technical Summary**:
- **Files Created/Modified**: [List with paths]
- **Key Implementations**: [What was built - entities, services, controllers]
- **Patterns Used**: [Specific patterns, Spring Boot starters, approaches]
- **Data Flow**: [How data moves through the layers]
- **Integration Points**: [What this connects to]
- **Important Notes**: [Gotchas, decisions, constraints for next missions]

**Agent Outputs**:
- `sub-agents-outputs/[agent]-[timestamp].md`
```

#### 3. Update CLAUDE.md (If Needed)
**CRITICAL: Update CLAUDE.md if mission introduced significant structural changes**

#### 4. Update Task Progress
- Mark mission as completed in missions list
- Update task status if all missions done

#### 5. Prompt User
"Mission N completed. Ready to start Mission N+1?"

## Key Principles
- **Respect user instructions** - If user is clear, follow exactly what they said
- **Keep it simple** - Don't overcomplicate straightforward tasks
- **Read summaries first** - Check progress tracker mission summaries before reading full docs
- **Entity-first approach** - For backend: Entity -> Repository -> Service -> Controller
- **Ask only when unclear** - Only clarify genuine ambiguities
- **Validation checkpoint** - User must validate plan before implementation
- **Utils delegation** - Mission reads utils, utils read architecture docs
- **One mission at a time** - Complete entirely before moving on
- **Technical summaries** - Always add detailed summary to progress tracker when completing

## Important Notes
- Mission workflow is independent - doesn't read architecture docs directly
- Utils files (backend/infrastructure/planning) handle architecture doc reading
- Always check `.mehdi-ab/structure/index.yaml` for paths
- User validation is mandatory before moving from brainstormed to validated

## Remember
- Always ask for task name if not provided
- **Read mission summaries from progress tracker first** - avoid re-reading full docs
- Only read full mission docs if summaries insufficient
- Check `.mehdi-ab/structure/index.yaml` for paths
- Delegate architecture reading to utils files
- Require validation before implementation
- Update status at each phase
- **Always create technical summary in progress tracker when mission completes**
