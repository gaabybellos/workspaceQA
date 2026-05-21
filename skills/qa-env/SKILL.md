# SKILL.md - qa-env

## Purpose

Manage the workspace environment independently of the QA cycle.

## Scope

`qa-env` is outside the cycle.
It does not install Playwright, Cypress, browsers, or runner files.

## Operations

### Check Workspace

```bash
npm run check-workspace
```

Verifies:

- Node.js
- npm
- governance files
- agent surfaces
- registered projects
- source paths
- optional `.env.local`

### Initialize Workspace

```bash
npm run init-workspace
```

Prepares core folders and validates prerequisites.
No automation runner is installed.

### Register Project

```bash
npm run register-project
```

Creates `projects/<slug>/` and optionally clones source into `projects/<slug>/source/`.

## Rules

- Never commit `.env.local` or credentials.
- Never install runner files in the workspace core.
- Document project-specific startup, seed data, and environment rules in `projects/<slug>/README.md`.
- Resolve workspace issues before running discovery.
