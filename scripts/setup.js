#!/usr/bin/env node

/**
 * Initializes the workspaceQA core.
 * This script does not install Playwright, Cypress, browsers, or runner files.
 */

const { execSync } = require('child_process');
const { createInterface } = require('readline');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');

const ROOT = resolve(__dirname, '..');
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback = '') =>
  new Promise((r) => rl.question(fallback ? `${q} [${fallback}]: ` : `${q}: `, (v) => r(v.trim() || fallback)));

function checkVersion(cmd, minMajor, label) {
  try {
    const out = execSync(`${cmd} --version`, { stdio: 'pipe' }).toString().trim();
    const major = parseInt(out.replace(/[^\d]/g, ''), 10);
    if (major < minMajor) {
      console.error(`x ${label} ${major} found. ${minMajor}+ required.`);
      process.exit(1);
    }
    console.log(`  ok ${label}: ${out}`);
  } catch {
    console.error(`x ${label} not found. Install it and retry.`);
    process.exit(1);
  }
}

async function writeEnvFile() {
  const envPath = join(ROOT, '.env.local');
  if (existsSync(envPath)) {
    console.log('  ok .env.local already exists');
    return;
  }

  const create = await ask('Create .env.local for the first registered project? [y/N]', 'N');
  if (create.toLowerCase() !== 'y') {
    console.log('  skip .env.local');
    return;
  }

  const baseUrl = await ask('BASE_URL for the target project', 'http://localhost:3000');
  const content =
    `# Local values for the target project under analysis.\n` +
    `# Runner-specific values are added only after a runner is installed.\n` +
    `BASE_URL=${baseUrl}\n`;

  writeFileSync(envPath, content);
  console.log('  ok .env.local created');
}

async function main() {
  console.log('\nworkspaceQA - Init Workspace\n');
  console.log('Checking prerequisites...');
  checkVersion('node', 18, 'Node.js');
  checkVersion('npm', 8, 'npm');

  console.log('\nPreparing core folders...');
  for (const dir of [
    'projects',
    'projects/_template',
    'docs/technical',
    'docs/standards',
    'test-case-repository/templates',
    'test-case-repository/repository',
    'skills',
    'docs',
    'scripts',
    '.claude/agents',
    '.opencode/prompts',
    '.codex/agents',
  ]) {
    mkdirSync(join(ROOT, dir), { recursive: true });
    console.log(`  ok ${dir}`);
  }

  await writeEnvFile();

  console.log('\nNo automation runner was installed.');
  console.log('Install Playwright or Cypress later through the runner installation flow.');
  console.log('\nNext steps:');
  console.log('  npm run register-project  - clone or link a project');
  console.log('  npm run check-workspace   - validate the workspace core');
  console.log('  @discovery <slug>         - run project discovery after registration\n');

  rl.close();
}

main().catch((e) => {
  console.error(e.message);
  rl.close();
  process.exit(1);
});
