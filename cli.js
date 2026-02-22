#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

function log(message, color = '') {
  console.log(`${color}${message}${COLORS.reset}`);
}

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source path not found: ${src}`);
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
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
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function askQuestion(rl, question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function install() {
  log('\n  Mehdi AB Method', COLORS.bright + COLORS.cyan);
  log('  Incremental Task Management for Spring Boot', COLORS.blue);
  log('  ============================================\n', COLORS.cyan);

  const targetDir = process.cwd();

  // Basic safety check
  const dangerousPaths = ['/', '/usr', '/etc', '/var', '/tmp'];
  const normalizedTarget = targetDir.replace(/\\/g, '/').toLowerCase();
  if (dangerousPaths.includes(normalizedTarget) || normalizedTarget === 'c:\\' || normalizedTarget === 'c:/') {
    log('  Error: Refusing to install in a system directory.', COLORS.red);
    log('  Please run this command from your project directory.', COLORS.yellow);
    process.exit(1);
  }

  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    // Check if .mehdi-ab already exists
    if (fs.existsSync(path.join(targetDir, '.mehdi-ab'))) {
      log('  Mehdi AB Method is already installed in this project.', COLORS.yellow);

      const answer = await askQuestion(rl, '  Do you want to overwrite? (y/N): ');
      if (answer.toLowerCase() !== 'y') {
        log('\n  Installation cancelled.', COLORS.yellow);
        rl.close();
        process.exit(0);
      }
      log('');
    }

    // Ask about builtin agents
    log('  Agent Configuration', COLORS.bright + COLORS.cyan);
    log('  ===================\n', COLORS.cyan);
    log('  The Mehdi AB Method includes 8 specialized Claude Code agents');
    log('  for Spring Boot development:\n');

    log('  Agent                     Expertise', COLORS.yellow);
    log('  -------------------------+-----------------------------------------', COLORS.dim);
    log('  spring-boot-architect     REST API, layered architecture, Spring MVC');
    log('  jpa-data-architect        JPA entities, repositories, Flyway/Liquibase');
    log('  spring-security-expert    JWT, OAuth2, Spring Security 6.x');
    log('  junit-tester              JUnit 5, Mockito, @WebMvcTest, @DataJpaTest');
    log('  integration-tester        @SpringBootTest, TestContainers, RestAssured');
    log('  api-designer              OpenAPI/Swagger, DTOs, validation');
    log('  docker-deployer           Dockerfile, docker-compose, Kubernetes');
    log('  qa-code-auditor           Code quality, SOLID, best practices');

    log('\n  These agents minimize context window usage and provide', COLORS.dim);
    log('  specialized expertise during missions.\n', COLORS.dim);

    const agentChoice = await askQuestion(rl, '  Install builtin agents? (Y/n): ');
    const installAgents = agentChoice.toLowerCase() !== 'n';

    rl.close();

    if (installAgents) {
      log('  Will install builtin agents', COLORS.green);
    } else {
      log('  Skipping builtin agents (can be installed later)', COLORS.yellow);
    }

    log('\n  Installing Mehdi AB Method files...', COLORS.blue);

    // Create .mehdi-ab directory structure
    const mehdiAbSource = path.join(__dirname, '.mehdi-ab');
    const mehdiAbTarget = path.join(targetDir, '.mehdi-ab');

    if (fs.existsSync(mehdiAbSource)) {
      copyRecursiveSync(mehdiAbSource, mehdiAbTarget);
      log('  [+] .mehdi-ab/ core workflows and structure', COLORS.green);
    } else {
      log('  [!] Warning: .mehdi-ab source not found in package', COLORS.yellow);
    }

    // Create .claude directory if it doesn't exist
    const claudeDir = path.join(targetDir, '.claude');
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }

    // Copy all commands
    const commandsSource = path.join(__dirname, '.claude', 'commands');
    const commandsDir = path.join(claudeDir, 'commands');

    if (fs.existsSync(commandsSource)) {
      if (!fs.existsSync(commandsDir)) {
        fs.mkdirSync(commandsDir, { recursive: true });
      }
      copyRecursiveSync(commandsSource, commandsDir);
      log('  [+] .claude/commands/ (10 slash commands)', COLORS.green);
    } else {
      log('  [!] Warning: commands source not found in package', COLORS.yellow);
    }

    // Create docs/architecture directory
    const docsDir = path.join(targetDir, 'docs', 'architecture');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      log('  [+] docs/architecture/', COLORS.green);
    }

    // Create docs/tasks directory
    const tasksDir = path.join(targetDir, 'docs', 'tasks');
    if (!fs.existsSync(tasksDir)) {
      fs.mkdirSync(tasksDir, { recursive: true });
      log('  [+] docs/tasks/', COLORS.green);
    }

    // Install builtin agents if requested
    if (installAgents) {
      const agentsSource = path.join(__dirname, '.claude', 'agents');
      const agentsTarget = path.join(claudeDir, 'agents');

      if (fs.existsSync(agentsSource)) {
        if (!fs.existsSync(agentsTarget)) {
          fs.mkdirSync(agentsTarget, { recursive: true });
        }
        copyRecursiveSync(agentsSource, agentsTarget);
        log('  [+] .claude/agents/ (8 specialized agents)', COLORS.green);
      } else {
        log('  [!] Warning: agent files not found in package', COLORS.yellow);
      }
    }

    // Success
    log('\n  ============================================', COLORS.green);
    log('  Installation complete!', COLORS.bright + COLORS.green);
    log('  ============================================\n', COLORS.green);

    log('  Installed:', COLORS.cyan);
    log('    .mehdi-ab/          Core workflows, utils, structure config');
    log('    .claude/commands/   10 slash commands for Claude Code');
    if (installAgents) {
      log('    .claude/agents/     8 specialized Spring Boot agents');
    }
    log('    docs/architecture/  Architecture documentation directory');
    log('    docs/tasks/         Task tracking directory');

    log('\n  Next steps:', COLORS.cyan);
    log('    1. Open Claude Code in this project');
    log('    2. Run /analyze-project to analyze your codebase');
    log('    3. Run /create-task to start your first task');
    log('    4. Run /create-mission to execute missions');

    log('\n  All commands:', COLORS.dim);
    log('    /mehdi-ab-master      Master workflow controller');
    log('    /analyze-project      Full project analysis (7 agents)');
    log('    /analyze-backend      Deep Spring Boot analysis');
    log('    /create-task          Create a new task');
    log('    /create-mission       Execute the next mission');
    log('    /resume-task          Resume a paused task');
    log('    /resume-mission       Resume a paused mission');
    log('    /extend-task          Add missions to a task');
    log('    /test-mission         Generate tests for completed work');
    log('    /update-architecture  Update architecture docs');

  } catch (error) {
    rl.close();
    log(`\n  Installation failed: ${error.message}`, COLORS.red);
    log('  Please report this issue at:', COLORS.yellow);
    log('  https://github.com/mehdiqanbarzadeh/mehdi-ab/issues\n', COLORS.yellow);
    process.exit(1);
  }
}

function uninstall() {
  log('\n  Mehdi AB Method - Uninstall', COLORS.bright + COLORS.cyan);
  log('  ===========================\n', COLORS.cyan);

  const targetDir = process.cwd();

  const dirsToRemove = [
    path.join(targetDir, '.mehdi-ab'),
    path.join(targetDir, '.claude', 'commands'),
    path.join(targetDir, '.claude', 'agents')
  ];

  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  log('  This will remove the following directories:', COLORS.yellow);
  dirsToRemove.forEach(dir => {
    const exists = fs.existsSync(dir);
    log(`    ${exists ? '[exists]' : '[not found]'} ${path.relative(targetDir, dir)}`, exists ? COLORS.yellow : COLORS.dim);
  });
  log('\n  Note: docs/architecture/ and docs/tasks/ will NOT be removed', COLORS.dim);
  log('  (they may contain your project documentation)\n', COLORS.dim);

  askQuestion(rl, '  Are you sure you want to uninstall? (y/N): ').then(answer => {
    rl.close();

    if (answer.toLowerCase() !== 'y') {
      log('  Uninstall cancelled.\n', COLORS.yellow);
      process.exit(0);
    }

    let removed = 0;
    dirsToRemove.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        log(`  [-] Removed ${path.relative(targetDir, dir)}`, COLORS.green);
        removed++;
      }
    });

    // Clean up empty .claude directory
    const claudeDir = path.join(targetDir, '.claude');
    if (fs.existsSync(claudeDir)) {
      const remaining = fs.readdirSync(claudeDir);
      if (remaining.length === 0) {
        fs.rmSync(claudeDir, { recursive: true, force: true });
        log('  [-] Removed empty .claude/', COLORS.green);
      }
    }

    if (removed > 0) {
      log('\n  Mehdi AB Method has been uninstalled.\n', COLORS.green);
    } else {
      log('\n  Nothing to uninstall.\n', COLORS.yellow);
    }
  });
}

function showHelp() {
  const pkg = require('./package.json');

  log(`\n  Mehdi AB Method v${pkg.version}`, COLORS.bright + COLORS.cyan);
  log('  Incremental Task Management for Spring Boot Projects', COLORS.blue);
  log('  ====================================================\n', COLORS.cyan);

  log('  DESCRIPTION', COLORS.bright);
  log('    mehdi-ab installs an incremental task management workflow');
  log('    system into your Spring Boot project. It provides Claude');
  log('    Code slash commands and specialized agents that break');
  log('    complex tasks into focused, sequential missions.\n');

  log('  USAGE', COLORS.bright);
  log('    npx mehdi-ab [command]\n');

  log('  COMMANDS', COLORS.bright);
  log('    install            Install Mehdi AB Method into current project (default)');
  log('    uninstall          Remove Mehdi AB Method files from current project');
  log('    --help,    -h      Show this help message');
  log('    --version, -v      Show version number\n');

  log('  WHAT GETS INSTALLED', COLORS.bright);
  log('    .mehdi-ab/         Core workflows, utils, and structure config');
  log('    .claude/commands/  10 slash commands for Claude Code');
  log('    .claude/agents/    8 specialized Spring Boot agents (optional)');
  log('    docs/architecture/ Architecture documentation directory');
  log('    docs/tasks/        Task tracking directory\n');

  log('  SLASH COMMANDS (after installation)', COLORS.bright);
  log('    /mehdi-ab-master      Master workflow controller');
  log('    /analyze-project      Full project analysis (7 agents in parallel)');
  log('    /analyze-backend      Deep Spring Boot backend analysis');
  log('    /create-task          Create a new task from a problem definition');
  log('    /create-mission       Execute the next mission in a task');
  log('    /resume-task          Resume a paused task');
  log('    /resume-mission       Resume a paused mission');
  log('    /extend-task          Add new missions to an existing task');
  log('    /test-mission         Generate JUnit/Mockito/TestContainers tests');
  log('    /update-architecture  Update architecture documentation\n');

  log('  SPECIALIZED AGENTS', COLORS.bright);
  log('    spring-boot-architect   REST API, Spring MVC, layered architecture');
  log('    jpa-data-architect      JPA entities, repositories, migrations');
  log('    spring-security-expert  JWT, OAuth2, Spring Security 6.x');
  log('    junit-tester            JUnit 5, Mockito, @WebMvcTest, @DataJpaTest');
  log('    integration-tester      @SpringBootTest, TestContainers, RestAssured');
  log('    api-designer            OpenAPI/Swagger, DTOs, validation');
  log('    docker-deployer         Dockerfile, docker-compose, Kubernetes');
  log('    qa-code-auditor         Code quality, SOLID, best practices\n');

  log('  TYPICAL WORKFLOW', COLORS.bright);
  log('    1. npx mehdi-ab                 Install into your project');
  log('    2. /analyze-project             Analyze your codebase');
  log('    3. /create-task                 Define what to build');
  log('    4. /create-mission              Execute missions one by one');
  log('    5. /test-mission                Add tests');
  log('    6. /update-architecture         Keep docs in sync\n');

  log('  EXAMPLES', COLORS.bright);
  log('    $ npx mehdi-ab                  # Install (interactive)');
  log('    $ npx mehdi-ab install          # Same as above');
  log('    $ npx mehdi-ab uninstall        # Remove from project');
  log('    $ npx mehdi-ab --version        # Show version\n');

  log('  MORE INFO', COLORS.dim);
  log('    Repository:  https://github.com/mehdiq/mehdi-ab');
  log('    Issues:      https://github.com/mehdiqanbarzadeh/mehdi-ab/issues\n');
}

function showVersion() {
  const pkg = require('./package.json');
  log(`mehdi-ab v${pkg.version}`, COLORS.cyan);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'install') {
  install().catch(error => {
    log(`\n  Unexpected error: ${error.message}`, COLORS.red);
    process.exit(1);
  });
} else if (command === '--help' || command === '-h') {
  showHelp();
} else if (command === '--version' || command === '-v') {
  showVersion();
} else if (command === 'uninstall') {
  uninstall();
} else {
  log(`\n  Unknown command: ${command}`, COLORS.red);
  log('  Run "npx mehdi-ab --help" for usage information.\n', COLORS.yellow);
  process.exit(1);
}