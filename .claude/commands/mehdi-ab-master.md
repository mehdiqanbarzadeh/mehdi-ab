# Mehdi AB Method Master

## Description
Master controller for the Mehdi AB Method - an incremental tasking workflow system for Spring Boot projects that transforms problems into tasks, then into focused missions.

## Usage
```
/mehdi-ab-master [workflow-name]
```

## Behavior

### When called without a workflow name:
Greets the user with:
```
Welcome to the Mehdi AB Method Master Controller!

The Mehdi AB Method transforms problems into tasks, then into focused missions for incremental Spring Boot development.

Choose a workflow to get started:
```
Then lists all available workflows below.

### When called with a workflow name:
Loads and executes the specified workflow from `.mehdi-ab/core/[workflow-name].md`

## Available Workflows

### Task Management
- **resume-task** - Resume an existing task from where it was paused
- **create-task** - Create a new task from a problem definition

### Mission Management
- **create-mission** - Transform a task into specific, focused missions
- **resume-mission** - Resume an incomplete mission
- **test-mission** - Create comprehensive JUnit 5/Mockito/TestContainers tests for implemented features
- **extend-task** - Add new missions to an existing task after initial missions are completed

### Analysis Workflows
- **analyze-backend** - Analyze Spring Boot backend architecture (controllers, services, repositories, entities)
- **analyze-project** - Complete project structure analysis with 7 parallel agents

### Architecture
- **update-architecture** - Update and maintain architecture documentation

## Workflow Details

Each workflow follows the Mehdi AB Method principles:
1. **Problem Definition** - Clear articulation of what needs to be solved
2. **Task Transformation** - Converting the problem into actionable tasks
3. **Mission Creation** - Breaking tasks into specific, focused missions (entity-first for complex tasks)
4. **Incremental Progress** - Each mission builds on previous knowledge

## Examples

```
/mehdi-ab-master create-task
# Starts a new task creation workflow

/mehdi-ab-master analyze-project
# Begins comprehensive Spring Boot project analysis with 7 agents

/mehdi-ab-master resume-mission
# Continues from the last incomplete mission
```

## Workflow Files Location
All workflow definitions are stored in `.mehdi-ab/core/`
