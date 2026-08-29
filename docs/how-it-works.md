# How workspaceQA Works

workspaceQA is a QA workspace, not a pre-installed automation framework.

`AGENTS.md` defines durable governance.
`.agents/` defines canonical agent contracts and shared context.

## Flow

```text
projects/<slug>/source/
  -> discovery
  -> docs/technical/<slug>/
  -> test-planner
  -> test-case-repository/repository/<slug>/
  -> optional automation runner
```

## Core Principle

The workspace separates source code, technical documentation, test design, and automation.

| Layer | Path | Purpose |
|---|---|---|
| Project source | `projects/<slug>/source/` | Target project code |
| Technical docs | `docs/technical/<slug>/` | Discovery and reverse engineering |
| Test repository | `test-case-repository/repository/<slug>/` | Requirements, cases, specs |
| Automation | `automation/<slug>/<runner>/` | Future runner-specific tests |
| Agent context | `.agents/` | Canonical agent contracts and shared rules |

## Discovery

Discovery reads the project README and source code.
It produces technical documentation for humans and agents.

## Test Planning

The test planner reads technical documentation.
It writes runner-agnostic requirements, cases, and specs.

## Automation

Automation is optional.
No runner is installed in the workspace core.

## Agent Context

Agents read shared rules from `.agents/context/`.
Agents read role-specific contracts from `.agents/contracts/<agent>.md`.
Executor folders are compatibility adapters for Claude Code, OpenCode, and Codex.

Read `docs/agent-consolidation-study.md` before deleting adapter folders.

Run this command after changing agent behavior:

```bash
npm run validate-agent-sync
```
