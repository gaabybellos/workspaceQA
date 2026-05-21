# CLAUDE.md - workspaceQA

Instructions for Claude Code operating in this workspace.

## First Reads

Before any task, read in this order:

1. `AGENTS.md`
2. `docs/writing-standards.md`
3. `projects/<slug>/project.json`, when a project is active
4. `projects/<slug>/README.md`, when a project is active

## Workspace Contract

workspaceQA is runner-agnostic.
Do not create Playwright, Cypress, or other runner files in the workspace core.
Runner files are created only under `automation/<slug>/<runner>/` after a runner installation flow exists and the user chooses it.

## Agent Surfaces

Claude reads from `.claude/agents/`.
OpenCode reads from `.opencode/prompts/`.
Codex reads from `.codex/agents/`.

All three surfaces must reflect the same operational contract.

## Active Agents

| Trigger | Agent | When |
|---|---|---|
| `@qa-cycle` | qa-cycle | Full cycle for a registered project |
| `@discovery` | discovery | Mandatory domain mapping and reverse engineering |
| `@test-planner` | test-planner | Runner-agnostic cases and specs |
| `@test-generator` | test-generator | Conditional, after runner installation |
| `@test-runner` | test-runner | Conditional, after tests exist |
| `@bug-auditor` | bug-auditor | Functional failure tracing |
| `@test-healer` | test-healer | Technical test break repair |
| `@sync-validator` | sync-validator | Surface consistency audit |

## Rules

- Never skip discovery.
- Never invent domain rules not present in README or source code.
- Never modify target project source without explicit user instruction.
- Never treat `projects/_template/` as a real project.
- Never fix failing assertions to hide bugs.
- Update all three agent surfaces when changing an agent.

## Traceability

```text
docs/technical/<slug>/modules/<module>/
  -> test-case-repository/repository/<slug>/cases/
  -> test-case-repository/repository/<slug>/specs/
  -> automation/<slug>/<runner>/...
```
