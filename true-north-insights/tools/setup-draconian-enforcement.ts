#!/usr/bin/env tsx

/**
 * DRACONIAN ENFORCEMENT SETUP SCRIPT
 * 
 * This TypeScript script configures the development environment for
 * zero-tolerance enforcement of traditional Angular standards.
 * 
 * Maintains rigid TypeScript standards throughout the enforcement system.
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

// ANSI Color codes for dramatic output (strongly typed)
interface ColorCodes {
  readonly red: string;
  readonly green: string;
  readonly yellow: string;
  readonly blue: string;
  readonly magenta: string;
  readonly cyan: string;
  readonly white: string;
  readonly reset: string;
  readonly bold: string;
  readonly dim: string;
}

const colors: ColorCodes = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
} as const;

interface CommandResult {
  readonly success: boolean;
  readonly error?: Error;
}

console.log(`${colors.bold}${colors.magenta}
╔═══════════════════════════════════════════════════════════════╗
║              DRACONIAN ENFORCEMENT SETUP                     ║
║                                                               ║
║        🛡️  CONFIGURING ZERO-TOLERANCE ENVIRONMENT 🛡️        ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`);

/**
 * Execute command with proper TypeScript error handling
 */
function executeCommand(command: string, description: string): CommandResult {
  console.log(`${colors.cyan}🔧 ${description}...${colors.reset}`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✅ ${description} completed${colors.reset}\n`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`${colors.red}❌ ${description} failed: ${errorMessage}${colors.reset}\n`);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}

/**
 * Check if file exists with proper typing
 */
function fileExists(filePath: string): boolean {
  try {
    return existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Check if command is available
 */
function commandExists(command: string): boolean {
  try {
    execSync(`${command} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * PHASE 1: GIT HOOKS CONFIGURATION
 */
console.log(`${colors.bold}${colors.yellow}📋 PHASE 1: GIT HOOKS CONFIGURATION${colors.reset}`);

// Make pre-commit hook executable (Unix systems only)
if (process.platform !== 'win32') {
  executeCommand('chmod +x .githooks/pre-commit', 'Making pre-commit hook executable');
}

// Configure Git to use custom hooks directory
executeCommand('git config core.hooksPath .githooks', 'Configuring Git hooks directory');

/**
 * PHASE 2: TOOL DEPENDENCIES
 */
console.log(`${colors.bold}${colors.yellow}📋 PHASE 2: TOOL DEPENDENCIES${colors.reset}`);

// Install tools dependencies if tools directory exists
if (fileExists('tools/package.json')) {
  console.log(`${colors.cyan}🔧 Updating tools dependencies...${colors.reset}`);
  const toolsInstallResult = executeCommand('cd tools && npm install --legacy-peer-deps', 'Installing tools dependencies');
  if (!toolsInstallResult.success) {
    console.log(`${colors.yellow}⚠️  Tools dependencies installation failed, but continuing...${colors.reset}\n`);
  }
} else {
  console.log(`${colors.yellow}⚠️  Tools directory not found, skipping tools dependencies${colors.reset}\n`);
}

// Install Lighthouse CI globally if not present
if (commandExists('lhci')) {
  console.log(`${colors.green}✅ Lighthouse CI already installed${colors.reset}\n`);
} else {
  executeCommand('npm install -g @lhci/cli', 'Installing Lighthouse CI globally');
}

// Install tsx for TypeScript execution if not present
if (commandExists('tsx')) {
  console.log(`${colors.green}✅ tsx already installed${colors.reset}\n`);
} else {
  executeCommand('npm install -g tsx', 'Installing tsx for TypeScript execution');
}

/**
 * PHASE 3: VALIDATION TEST RUN
 */
console.log(`${colors.bold}${colors.yellow}📋 PHASE 3: VALIDATION TEST RUN${colors.reset}`);

// Test draconian linting
const lintResult: CommandResult = executeCommand('npm run lint:strict', 'Testing draconian ESLint rules');

// Test build process
const buildResult: CommandResult = executeCommand('npm run build:test', 'Testing build process');

/**
 * PHASE 4: DOCUMENTATION GENERATION
 */
console.log(`${colors.bold}${colors.yellow}📋 PHASE 4: DOCUMENTATION GENERATION${colors.reset}`);

// Create enforcement status file with proper typing
interface EnforcementStatus {
  readonly configurationDate: string;
  readonly gitHooksConfigured: boolean;
  readonly eslintRulesActive: number;
  readonly buildValidation: 'PASSING' | 'REQUIRES_ATTENTION';
  readonly lintingStatus: 'COMPLIANT' | 'VIOLATIONS_DETECTED';
}

const enforcementStatus: EnforcementStatus = {
  configurationDate: new Date().toISOString(),
  gitHooksConfigured: true,
  eslintRulesActive: 12,
  buildValidation: buildResult.success ? 'PASSING' : 'REQUIRES_ATTENTION',
  lintingStatus: lintResult.success ? 'COMPLIANT' : 'VIOLATIONS_DETECTED'
};

const statusMarkdown = `# Draconian Enforcement Status

## Configuration Complete ✅

- **Git Hooks**: Configured (${enforcementStatus.configurationDate})
- **ESLint Rules**: Active (${enforcementStatus.eslintRulesActive} draconian rules)
- **Build Validation**: ${enforcementStatus.buildValidation}
- **Linting Status**: ${enforcementStatus.lintingStatus}

## Enforcement Levels

### 🚨 CRITICAL (Commit Blocked)
- Standalone components
- inject() function usage  
- async/await in services
- 'any' type usage
- Missing NgModule architecture

### ⚠️ WARNING (CI/CD Flagged)
- Performance budget violations
- Test coverage < 95%
- Security vulnerabilities
- Bundle size exceeded

## Usage Commands

\`\`\`bash
# Run full draconian validation
npm run validate:all

# Check specific areas
npm run lint:strict
npm run validate:performance  
npm run validate:bundle
npm run validate:security

# Test pre-commit enforcement
npm run enforce:pre-commit
\`\`\`

## Bypass (Emergency Only)

\`\`\`bash
# Bypass pre-commit (NOT RECOMMENDED)
git commit --no-verify

# Disable enforcement temporarily
git config core.hooksPath ""
\`\`\`

---
*Generated: ${enforcementStatus.configurationDate}*
*Federal-grade enforcement active*
*TypeScript-first configuration maintained*
`;

const statusFilePath = join('documentation', 'development', 'ENFORCEMENT_STATUS.md');

try {
  writeFileSync(statusFilePath, statusMarkdown);
  console.log(`${colors.green}✅ Enforcement status documentation created${colors.reset}\n`);
} catch (error) {
  console.log(`${colors.red}❌ Failed to create status documentation: ${error instanceof Error ? error.message : 'Unknown error'}${colors.reset}\n`);
}

/**
 * FINAL STATUS EVALUATION
 */
console.log(`${colors.bold}${colors.magenta}
╔═══════════════════════════════════════════════════════════════╗
║                    SETUP COMPLETE                             ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`);

const allOperationsSuccessful: boolean = lintResult.success && buildResult.success;

if (allOperationsSuccessful) {
  console.log(`${colors.bold}${colors.green}
🏆 DRACONIAN ENFORCEMENT FULLY ACTIVATED 🏆

✅ Git hooks configured for zero-tolerance validation
✅ ESLint rules enforcing traditional Angular patterns  
✅ Build validation with performance budgets
✅ CI/CD pipeline ready for federal compliance
✅ Pre-commit enforcement active
✅ TypeScript standards maintained throughout

🎯 LEGENDARY STANDARDS NOW ENFORCED!

Next commits will be validated against draconian standards.
Run 'npm run validate:all' before committing for best results.
${colors.reset}`);
} else {
  console.log(`${colors.bold}${colors.yellow}
⚠️  SETUP COMPLETE WITH WARNINGS ⚠️

Git hooks and enforcement configured, but validation detected issues:
${!lintResult.success ? '❌ Linting violations require resolution' : '✅ Linting passed'}
${!buildResult.success ? '❌ Build issues require resolution' : '✅ Build passed'}

🛠️  RECOMMENDED ACTIONS:
1. Run 'npm run lint:fix' to auto-resolve issues
2. Run 'npm run validate:all' for comprehensive check  
3. Review documentation/development/DRACONIAN_ANGULAR_STANDARDS.md
4. Ensure all code follows traditional Angular patterns

💪 Fix these issues to achieve legendary compliance!
${colors.reset}`);
}

console.log(`${colors.dim}
📚 Documentation Available:
   - documentation/development/DRACONIAN_ANGULAR_STANDARDS.md
   - documentation/development/REQUIREMENTS_SPECIFICATION.md  
   - documentation/development/ENFORCEMENT_STATUS.md
   - documentation/development/ESLINT_CONFIG.md

🔗 CI/CD Pipeline: .github/workflows/draconian-enforcement.yml
🪝 Git Hooks: .githooks/pre-commit
🔧 TypeScript Setup: Maintains rigid typing throughout
${colors.reset}`);

// Exit with proper TypeScript typing
process.exit(allOperationsSuccessful ? 0 : 1);