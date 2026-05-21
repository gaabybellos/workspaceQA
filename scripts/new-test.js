#!/usr/bin/env node

const { createInterface } = require('readline');
const { mkdirSync, writeFileSync, readdirSync, existsSync, statSync } = require('fs');
const { join } = require('path');

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, (v) => r(v.trim())));

function listProjects() {
  const dir = join(__dirname, '..', 'projects');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => {
    if (f === '_template' || f === 'README.md') return false;
    return statSync(join(dir, f)).isDirectory();
  });
}

async function main() {
  console.log('\nworkspaceQA - New Spec Scaffold\n');

  const projects = listProjects();
  if (projects.length === 0) {
    console.log('No projects registered. Run: npm run register-project');
    rl.close();
    return;
  }

  console.log(`Registered projects: ${projects.join(', ')}`);

  const project = await ask('Project slug: ');
  if (!projects.includes(project)) {
    console.log(`Project "${project}" not found.`);
    rl.close();
    return;
  }

  const domain = await ask('Domain (for example: catalog, checkout, users): ');
  const moduleName = await ask('Module (for example: product-list, order-summary): ');
  const specId = await ask('First spec ID (for example: TC-SHOP-CATALOG-001): ');
  const title = await ask('Spec title: ');

  const specDir = join(__dirname, '..', 'test-case-repository', 'repository', project, 'specs', domain);
  mkdirSync(specDir, { recursive: true });

  const specFile = join(specDir, `${moduleName}.md`);
  if (existsSync(specFile)) {
    console.log(`Spec already exists: test-case-repository/repository/${project}/specs/${domain}/${moduleName}.md`);
    rl.close();
    return;
  }

  const content =
    `# ${moduleName}\n\n` +
    `_Linked case: test-case-repository/repository/${project}/cases/${domain}/${moduleName}/_\n\n` +
    `## Pre-conditions\n\n` +
    `- To verify from discovery output.\n\n` +
    `## Test Cases\n\n` +
    `### ${specId} - ${title}\n\n` +
    `**Steps:**\n` +
    `1. Describe the user action.\n\n` +
    `**Expected result:** Describe the observable outcome.\n\n` +
    `## Observable Elements\n\n` +
    `- To verify in the live app or source code.\n`;

  writeFileSync(specFile, content);

  console.log(`Spec scaffold created: test-case-repository/repository/${project}/specs/${domain}/${moduleName}.md\n`);
  rl.close();
}

main().catch((e) => {
  console.error(e);
  rl.close();
  process.exit(1);
});
