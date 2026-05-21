#!/usr/bin/env node

const { execSync } = require('child_process');
const { createInterface } = require('readline');
const { mkdirSync, writeFileSync, existsSync } = require('fs');
const { join, relative, resolve } = require('path');

const ROOT = resolve(__dirname, '..');
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback = '') =>
  new Promise((r) => rl.question(fallback ? `${q} [${fallback}]: ` : `${q}: `, (v) => r(v.trim() || fallback)));

function normalizeSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function run(cmd, cwd = ROOT) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

async function main() {
  console.log('\nworkspaceQA - Register Project\n');

  const slug = normalizeSlug(await ask('Project slug'));
  if (!slug) {
    console.log('Slug is required.');
    rl.close();
    return;
  }

  const dir = join(ROOT, 'projects', slug);
  if (existsSync(dir)) {
    console.log(`Project "${slug}" already exists at projects/${slug}/`);
    rl.close();
    return;
  }

  const name = await ask('Display name', slug);
  const description = await ask('Short description');
  const baseUrl = await ask('Base URL for local/staging app', 'http://localhost:3000');
  const repoUrl = await ask('Git repository URL to clone (leave empty to use an existing local path)');
  const branch = repoUrl ? await ask('Branch', 'main') : '';
  const existingPath = repoUrl ? '' : await ask('Existing local source path');
  const projectType = await ask('Project type: web, api, fullstack, library, other', 'web');

  mkdirSync(dir, { recursive: true });

  let sourcePath = null;
  if (repoUrl) {
    const sourceDir = join(dir, 'source');
    console.log(`\nCloning ${repoUrl} into projects/${slug}/source/`);
    run(`git clone --branch ${branch} ${repoUrl} "${sourceDir}"`);
    sourcePath = `projects/${slug}/source`;
  } else if (existingPath) {
    sourcePath = relative(ROOT, resolve(existingPath)).replace(/\\/g, '/');
  }

  const project = {
    name,
    slug,
    description,
    project_type: projectType,
    base_url: baseUrl,
    repo_url: repoUrl || null,
    branch: branch || null,
    source_path: sourcePath,
    api_docs_url: null,
    automation: {
      runner: null,
      installed: false
    },
    registered_at: new Date().toISOString()
  };

  writeFileSync(join(dir, 'project.json'), JSON.stringify(project, null, 2) + '\n');
  writeFileSync(
    join(dir, 'README.md'),
    `# ${name}\n\n` +
      `${description || 'Describe what this project does and who uses it.'}\n\n` +
      `## What It Does\n\n` +
      `Describe the product purpose, users, and main value.\n\n` +
      `## User Roles And Permissions\n\n` +
      `| Role | Can Do | Cannot Do |\n|---|---|---|\n| Public user | To verify | To verify |\n\n` +
      `## Key User Flows\n\n` +
      `1. To verify from README and source code.\n\n` +
      `## Routes And Access Requirements\n\n` +
      `| Route Or Entry Point | Access | Role | Screen Or Handler |\n|---|---|---|---|\n| To verify | To verify | To verify | To verify |\n\n` +
      `## Key Entities\n\n` +
      `| Entity | Key Fields | Relationships |\n|---|---|---|\n| To verify | To verify | To verify |\n\n` +
      `## Tech Stack\n\n` +
      `Document frontend, backend, database, APIs, auth, queues, and integrations.\n\n` +
      `## Module Dependency Graph\n\n` +
      `Document module order after discovery.\n\n` +
      `## Test Data Requirements\n\n` +
      `Document required seeds, accounts, fixtures, and cleanup rules.\n\n` +
      `## Known Complexity\n\n` +
      `Document async behavior, external services, unstable areas, and risks.\n`
  );

  console.log(`\nProject registered at projects/${slug}/`);
  console.log('\nNext steps:');
  console.log(`  1. Review projects/${slug}/README.md`);
  console.log(`  2. Run @discovery ${slug}`);
  console.log(`  3. Review docs/technical/${slug}/ after discovery`);
  console.log(`  4. Let test-planner create cases in test-case-repository/repository/${slug}/\n`);

  rl.close();
}

main().catch((e) => {
  console.error(e.message);
  rl.close();
  process.exit(1);
});
