#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = '') {
  console.log(`${color}${message}${COLORS.reset}`);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function install() {
  log('\n  Mehdi AB Method Installation', COLORS.bright + COLORS.cyan);
  log('====================================\n', COLORS.cyan);
  log('Incremental task management for Spring Boot projects\n', COLORS.blue);

  const targetDir = process.cwd();

  // Check if .mehdi-ab already exists
  if (fs.existsSync(path.join(targetDir, '.mehdi-ab'))) {
    log('  Mehdi AB Method is already installed in this project!', COLORS.yellow);
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise(resolve => {
      readline.question('Do you want to overwrite? (y/N): ', resolve);
    });
    readline.close();

    if (answer.toLowerCase() !== 'y') {
      log('Installation cancelled.', COLORS.yellow);
      process.exit(0);
    }
  }

  // Ask about builtin agents
  log('  Agent Configuration', COLORS.bright + COLORS.cyan);
  log('=====================\n', COLORS.cyan);
  log('The Mehdi AB Method works with specialized Claude Code agents for Spring Boot development.');
  log('We have 8 builtin agents that integrate seamlessly with the workflow:\n');

  log('Available builtin agents:', COLORS.yellow);
  log('  spring-boot-architect   - REST API, layered architecture, Spring MVC');
  log('  jpa-data-architect      - JPA entities, repositories, Flyway/Liquibase');
  log('  spring-security-expert  - JWT, OAuth2, Spring Security 6.x');
  log('  junit-tester            - JUnit 5, Mockito, @WebMvcTest, @DataJpaTest');
  log('  integration-tester      - @SpringBootTest, TestContainers, RestAssured');
  log('  api-designer            - OpenAPI/Swagger, DTOs, validation');
  log('  docker-deployer         - Dockerfile, docker-compose, Kubernetes');
  log('  qa-code-auditor         - Code quality, SOLID, Spring Boot best practices');

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  log('\nThese agents help minimize context window usage and provide specialized expertise.');
  const agentChoice = await new Promise(resolve => {
    readline.question('\nDo you want to install these builtin agents? (Y/n): ', resolve);
  });
  readline.close();

  const installAgents = agentChoice.toLowerCase() !== 'n';

  if (installAgents) {
    log('  Will install builtin agents', COLORS.green);
  } else {
    log('  Skipping builtin agents installation', COLORS.yellow);
    log('   You can always install agents later or use your own custom agents');
  }

  try {
    log('\n  Installing Mehdi AB Method files...', COLORS.blue);

    // Create .mehdi-ab directory structure
    const mehdiAbSource = path.join(__dirname, '.mehdi-ab');
    const mehdiAbTarget = path.join(targetDir, '.mehdi-ab');

    if (fs.existsSync(mehdiAbSource)) {
      copyRecursiveSync(mehdiAbSource, mehdiAbTarget);
      log('  Created .mehdi-ab directory', COLORS.green);
    }

    // Create .claude directory if it doesn't exist
    const claudeDir = path.join(targetDir, '.claude');
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }

    // Copy all commands
    const commandsDir = path.join(claudeDir, 'commands');
    if (!fs.existsSync(commandsDir)) {
      fs.mkdirSync(commandsDir, { recursive: true });
    }

    // Copy all command files from the package
    const commandsSource = path.join(__dirname, '.claude', 'commands');
    if (fs.existsSync(commandsSource)) {
      copyRecursiveSync(commandsSource, commandsDir);
      log('  Installed all Mehdi AB Method commands', COLORS.green);
      log('   /mehdi-ab-master (master workflow controller)', COLORS.cyan);
      log('   Individual workflow commands: /create-task, /create-mission, etc.', COLORS.cyan);
    }

    // Create docs/architecture directory
    const docsDir = path.join(targetDir, 'docs', 'architecture');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      log('  Created docs/architecture directory', COLORS.green);
    }

    // Create docs/tasks directory
    const tasksDir = path.join(targetDir, 'docs', 'tasks');
    if (!fs.existsSync(tasksDir)) {
      fs.mkdirSync(tasksDir, { recursive: true });
      log('  Created docs/tasks directory', COLORS.green);
    }

    // Install builtin agents if requested
    if (installAgents) {
      log('\n  Installing builtin agents...', COLORS.blue);

      try {
        // Copy agents directory
        const agentsSource = path.join(__dirname, '.claude', 'agents');
        const agentsTarget = path.join(claudeDir, 'agents');

        if (fs.existsSync(agentsSource)) {
          copyRecursiveSync(agentsSource, agentsTarget);
          log('  Builtin agents installed successfully', COLORS.green);
        } else {
          log('  Agent files not found in package', COLORS.yellow);
        }
      } catch (error) {
        log('  Could not install builtin agents automatically', COLORS.yellow);
        log('   Error: ' + error.message, COLORS.red);
      }
    }

    log('\n  Mehdi AB Method installed successfully!', COLORS.bright + COLORS.green);

    if (installAgents) {
      log('\n  Installation complete with 8 Spring Boot agents!', COLORS.green);
    } else {
      log('\n  Installation complete!', COLORS.green);
    }

    log('\nNext steps:', COLORS.cyan);
    log('1. Open Claude Code in this project');
    log('2. Choose your preferred way to start:');
    log('   Quick: /create-task, /analyze-project, etc.');
    log('   Traditional: /mehdi-ab-master');
    log('3. Follow the workflow to create your first task');

    if (installAgents) {
      log('\n  Builtin agents ready to use:', COLORS.cyan);
      log('  Use specialized agents automatically in missions');
      log('  Check sub-agents-outputs/ folder for detailed agent work');
    }

    log('\nFor more information, visit:', COLORS.blue);
    log('https://github.com/mehdiq/mehdi-ab');

  } catch (error) {
    log(`\n  Installation failed: ${error.message}`, COLORS.red);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'install') {
  install();
} else if (command === '--help' || command === '-h') {
  log('\n  Mehdi AB Method CLI', COLORS.bright + COLORS.cyan);
  log('========================\n', COLORS.cyan);
  log('Incremental task management for Spring Boot projects\n', COLORS.blue);
  log('Usage:', COLORS.yellow);
  log('  npx mehdi-ab          Install Mehdi AB Method in current project');
  log('  npx mehdi-ab install  Install Mehdi AB Method in current project');
  log('  npx mehdi-ab --help   Show this help message');
  log('\nMore info: https://github.com/mehdiq/mehdi-ab', COLORS.blue);
} else if (command === '--version' || command === '-v') {
  const packageJson = require('./package.json');
  log(`mehdi-ab v${packageJson.version}`, COLORS.cyan);
} else {
  log(`Unknown command: ${command}`, COLORS.red);
  log('Run "npx mehdi-ab --help" for usage information', COLORS.yellow);
  process.exit(1);
}
