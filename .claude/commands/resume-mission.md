# Resume Mission

## Description
Resume an incomplete mission, continuing development work from where it was paused.

## Usage
```
/resume-mission
```

## Behavior
Loads and executes the resume-mission workflow from `.mehdi-ab/core/resume-mission.md`

This workflow will:
1. Find the most recent incomplete mission
2. Load the mission context and architecture plan
3. Continue implementation from the last checkpoint
4. Coordinate with appropriate Spring Boot development agents
5. Update progress tracking

## Workflow Details
The resume-mission workflow ensures:
- **Mission Recovery** - Finding and loading incomplete missions
- **Context Restoration** - Restoring technical context and progress state
- **Agent Coordination** - Deploying appropriate Spring Boot agents
- **Incremental Progress** - Continuing from specific implementation points
- **Architecture Compliance** - Maintaining planned technical approach

## Examples
```
/resume-mission
# Finds the most recent incomplete mission
# Restores development context and continues implementation
# Maintains architectural plans and Spring Boot patterns
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master resume-mission
```
