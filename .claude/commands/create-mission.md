# Create Mission

## Description
Transform a task into specific, focused missions for implementation. Creates detailed mission documents with architecture plans for Spring Boot development.

## Usage
```
/create-mission
```

## Behavior
Loads and executes the create-mission workflow from `.mehdi-ab/core/create-mission.md`

This workflow will:
1. Select a task to convert into missions
2. Analyze the task requirements and technical context
3. Create detailed mission documents with implementation plans
4. Set up architecture planning for backend/infrastructure development
5. Coordinate with specialized Spring Boot agents for implementation

## Workflow Details
The create-mission workflow provides:
- **Mission Planning** - Breaking tasks into focused, implementable missions
- **Architecture Design** - Creating detailed technical plans for each mission
- **Agent Coordination** - Setting up specialized Spring Boot agents (spring-boot-architect, jpa-data-architect, etc.)
- **Progress Tracking** - Establishing clear mission completion criteria
- **Context Preservation** - Maintaining technical constraints and Spring Boot patterns

## Examples
```
/create-mission
# Transforms a task into specific missions
# Creates detailed implementation plans
# Sets up specialized agents for Spring Boot development work
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master create-mission
```
