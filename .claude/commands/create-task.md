# Create Task

## Description
Create a new task from a problem definition using the Mehdi AB Method's incremental tasking workflow system for Spring Boot projects.

## Usage
```
/create-task
```

## Behavior
Loads and executes the create-task workflow from `.mehdi-ab/core/create-task.md`

This workflow will:
1. Gather detailed problem requirements through interactive questioning
2. Analyze Spring Boot project context and extract technical constraints
3. Create a comprehensive task document with technical details
4. Define all missions upfront based on project analysis (entity-first for complex tasks)
5. Set up progress tracking for incremental development

## Workflow Details
The create-task workflow follows Mehdi AB Method principles:
- **Problem Definition** - Interactive gathering of requirements and technical constraints
- **Context Analysis** - Understanding existing Spring Boot architecture and patterns
- **Task Documentation** - Creating comprehensive task documents with code constraints and hints
- **Mission Planning** - Defining all missions upfront (Entity -> Service -> Controller -> Test)
- **Technical Guidance** - Including Spring Boot patterns, testing requirements, and performance considerations

## Examples
```
/create-task
# Starts interactive task creation workflow
# Will ask questions about the problem, technical requirements, and constraints
# Creates task document with technical context and mission roadmap
```

## Alternative Usage
You can also use the traditional master controller:
```
/mehdi-ab-master create-task
```
