#!/usr/bin/env node

const { execSync } = require('child_process');
const { existsSync, readdirSync, statSync, readFileSync } = require('fs');
const { join, resolve } = require('path');

const ROOT = resolve(__dirname, '..');
let allOk = true;

function pass(label, detail = '') {
  console.log(`  ok  ${label}${detail ? ': ' + detail : ''}`);
}

function warn(label, hint = '') {
  console.log(`  warn ${label}${hint ? '\n       ' + hint : ''}`);
}

function fail(label, hint = '') {
  console.log(`  x   ${label}${hint ? '\n       ' + hint : ''}`);
  allOk = false;
}

function run(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString().trim();
}

function listRegisteredProjects() {
  const projectsDir = join(ROOT, 'projects');
  if (!existsSync(projectsDir)) return [];
  return readdirSync(projectsDir).filter((f) => {
    if (f === '_template' || f === 'README.md') return false;
    return statSync(join(projectsDir, f)).isDirectory();
  });
}

console.log('\nworkspaceQA - Workspace Check\n');

try {
  const v = run('node --version');
  const major = parseInt(v.replace('v', ''), 10);
  major >= 18 ? pass('Node.js', v) : fail('Node.js 18+ required', `Found ${v}`);
} catch {
  fail('Node.js not found', 'Install Node.js 18+.');
}

try {
  pass('npm', run('npm --version'));
} catch {
  fail('npm not found');
}

for (const file of [
  'AGENTS.md',
  'docs/writing-standards.md',
  'skills/discovery/SKILL.md',
  'skills/qa-env/SKILL.md',
  'test-case-repository/README.md',
]) {
  existsSync(join(ROOT, file)) ? pass(file) : fail(`${file} missing`);
}

for (const dir of ['.claude/agents', '.opencode/prompts', '.codex/agents', 'projects', 'docs/technical', 'test-case-repository']) {
  existsSync(join(ROOT, dir)) ? pass(dir) : fail(`${dir} missing`);
}

const projects = listRegisteredProjects();
projects.length > 0
  ? pass('Registered projects', projects.join(', '))
  : warn('No projects registered', 'Run: npm run register-project');

for (const slug of projects) {
  const projectJson = join(ROOT, 'projects', slug, 'project.json');
  const projectReadme = join(ROOT, 'projects', slug, 'README.md');
  if (!existsSync(projectJson)) {
    fail(`projects/${slug}/project.json missing`);
    continue;
  }
  if (!existsSync(projectReadme)) {
    fail(`projects/${slug}/README.md missing`);
  }

  const project = JSON.parse(readFileSync(projectJson, 'utf8'));
  if (project.source_path) {
    const sourcePath = join(ROOT, project.source_path);
    existsSync(sourcePath)
      ? pass(`projects/${slug} source`, project.source_path)
      : warn(`projects/${slug} source path not found`, project.source_path);
  } else {
    warn(`projects/${slug} has no source_path`, 'Discovery will rely on README and reachable app only.');
  }

  if (project.automation?.runner) {
    warn(
      `projects/${slug} declares runner ${project.automation.runner}`,
      'Runner installation validation is handled by the selected runner flow.'
    );
  } else {
    pass(`projects/${slug} runner`, 'none installed');
  }
}

const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8');
  content.match(/^BASE_URL=.+/m)
    ? pass('.env.local BASE_URL')
    : warn('.env.local has no BASE_URL', 'Set it before browser-based planning.');
} else {
  warn('.env.local missing', 'Optional until a project needs runtime values.');
}

console.log('');
if (allOk) {
  console.log('Workspace core checks passed.\n');
} else {
  console.log('Fix the required issues before running discovery.\n');
  process.exit(1);
}
