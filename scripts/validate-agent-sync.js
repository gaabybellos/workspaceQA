#!/usr/bin/env node

const { existsSync, readdirSync, readFileSync, statSync } = require('fs');
const { join, resolve, relative } = require('path');

const ROOT = resolve(__dirname, '..');
const EXPECTED_AGENTS = [
  'qa-cycle',
  'discovery',
  'test-planner',
  'test-generator',
  'test-runner',
  'bug-auditor',
  'test-healer',
  'sync-validator',
];
const REQUIRED_CONTEXT = [
  '.agents/context/workspace-rules.md',
  '.agents/context/anti-hallucination.md',
  '.agents/context/runner-agnostic.md',
  '.agents/context/traceability.md',
];

let allOk = true;

function pass(label) {
  console.log(`  ok  ${label}`);
}

function fail(label, hint = '') {
  console.log(`  x   ${label}${hint ? '\n       ' + hint : ''}`);
  allOk = false;
}

function warn(label, hint = '') {
  console.log(`  warn ${label}${hint ? '\n       ' + hint : ''}`);
}

function read(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function exists(path) {
  return existsSync(join(ROOT, path));
}

function assertContains(file, needle, label) {
  if (!exists(file)) {
    fail(`${file} missing`);
    return;
  }
  read(file).includes(needle) ? pass(label) : fail(label, `${file} must include: ${needle}`);
}

function walk(dir, files = []) {
  const full = join(ROOT, dir);
  if (!existsSync(full)) return files;
  for (const item of readdirSync(full)) {
    const abs = join(full, item);
    const rel = relative(ROOT, abs).replace(/\\/g, '/');
    if (['.git', 'node_modules'].includes(item)) continue;
    if (statSync(abs).isDirectory()) {
      walk(rel, files);
    } else {
      files.push(rel);
    }
  }
  return files;
}

console.log('\nworkspaceQA - Agent Sync Validation\n');

assertContains('AGENTS.md', '.agents/', 'AGENTS.md references canonical agent context');
assertContains('docs/writing-standards.md', '.agents/contracts/<name>.md', 'writing standards reference canonical contracts');

for (const file of ['.agents/README.md', '.agents/registry.yaml', ...REQUIRED_CONTEXT]) {
  exists(file) ? pass(file) : fail(`${file} missing`);
}

for (const agent of EXPECTED_AGENTS) {
  const contract = `.agents/contracts/${agent}.md`;
  const claude = `.claude/agents/${agent}.md`;
  const opencode = `.opencode/prompts/${agent}.md`;
  const codex = `.codex/agents/${agent}.toml`;

  exists(contract) ? pass(`${contract}`) : fail(`${contract} missing`);
  exists(claude) ? pass(`${claude}`) : fail(`${claude} missing`);
  exists(opencode) ? pass(`${opencode}`) : fail(`${opencode} missing`);
  exists(codex) ? pass(`${codex}`) : fail(`${codex} missing`);

  if (exists(claude)) assertContains(claude, contract, `${claude} links canonical contract`);
  if (exists(opencode)) assertContains(opencode, contract, `${opencode} links canonical contract`);
  if (exists(codex)) assertContains(codex, contract, `${codex} links canonical contract`);
}

const rootFiles = walk('.').filter((file) => !file.startsWith('automation/'));
const forbiddenRunnerFiles = rootFiles.filter((file) => {
  const name = file.toLowerCase();
  return (
    name.endsWith('playwright.config.js') ||
    name.endsWith('playwright.config.ts') ||
    name.endsWith('cypress.config.js') ||
    name.endsWith('cypress.config.ts') ||
    name.includes('/cypress/')
  );
});

if (forbiddenRunnerFiles.length === 0) {
  pass('runner-specific files are outside the workspace core');
} else {
  fail('runner-specific files found in workspace core', forbiddenRunnerFiles.join(', '));
}

const specFiles = walk('test-case-repository/repository').filter((file) => file.includes('/specs/') && file.endsWith('.md'));
for (const file of specFiles) {
  const content = read(file);
  /TC-[A-Z0-9]+-[A-Z0-9]+-\d{3}/.test(content)
    ? pass(`${file} references TC ID`)
    : fail(`${file} missing TC ID`);
}

if (specFiles.length === 0) {
  warn('no specs found', 'Run discovery and test-planner for a registered project.');
}

console.log('');
if (allOk) {
  console.log('Agent sync validation passed.\n');
} else {
  console.log('Agent sync validation failed.\n');
  process.exit(1);
}

