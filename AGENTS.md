# AGENTS.md - workspaceQA

Durable governance rules for all agents and executors operating in this workspace.
Read this file before any other governance document.

## Agent Boot Sequence

Every AI executor must read this sequence before acting:

1. `AGENTS.md`
2. `docs/writing-standards.md`
3. `.agents/README.md`
4. `.agents/registry.yaml`
5. `.agents/context/workspace-rules.md`
6. `.agents/context/anti-hallucination.md`
7. `.agents/context/runner-agnostic.md`
8. `.agents/context/traceability.md`
9. `.agents/contracts/<active-agent>.md`

Do not treat `.claude/agents/`, `.opencode/prompts/`, or `.codex/agents/` as sources of truth.
Use executor-specific folders only as compatibility adapters.

## Purpose

workspaceQA is a runner-agnostic QA workspace for project discovery, reverse engineering, test case design, and future automation planning.

The workspace does not ship Playwright, Cypress, browser installs, runner configs, or runner workflows.
Automation runners are installed later, per project, after discovery defines the test architecture.

## Boundaries

| Area | Purpose |
|---|---|
| `projects/` | Registered target projects and cloned source code |
| `docs/technical/` | Discovery and reverse-engineering documentation |
| `test-case-repository/` | Requirements, test cases, runner-agnostic specs, and templates |
| `automation/` | Future runner-specific automation, created only after runner installation |
| `.agents/` | Canonical agent context, contracts, and shared anti-hallucination rules |

## Executor Surfaces

| Executor | Surface | Format |
|---|---|---|
| Canonical | `.agents/contracts/` | Markdown |
| Claude Code | `.claude/agents/` | Frontmatter YAML + Markdown adapter |
| OpenCode | `.opencode/prompts/` | Markdown adapter |
| Codex | `.codex/agents/` | TOML adapter with embedded instructions |

`.agents/` is the source of truth for agent behavior.
Executor surfaces must not introduce behavior that is absent from `.agents/`.

## Sync Rules

When modifying an agent:

1. Update `.agents/contracts/<name>.md`.
2. Update `.claude/agents/<name>.md`.
3. Update `.opencode/prompts/<name>.md`.
4. Update `.codex/agents/<name>.toml`.
5. Update affected docs.
6. Run `npm run validate-agent-sync`.

When modifying tool configuration, update `.mcp.json`, `opencode.json`, and `.codex/config.toml` together.

## Active Agents

| Agent | Role | Cycle Position |
|---|---|---|
| `qa-cycle` | Orchestrates discovery, planning, optional generation, and optional execution | Entry point |
| `discovery` | Reads project README and source code, then writes technical documentation | Phase 1 - mandatory |
| `test-planner` | Converts technical documentation into requirements, cases, and specs | Phase 2 |
| `test-generator` | Generates tests only for the installed runner selected by the project | Phase 3 - conditional |
| `test-runner` | Executes tests only when a runner is installed | Phase 4 - conditional |
| `bug-auditor` | Traces functional failures through UI, API, logic, and data layers | Conditional |
| `test-healer` | Fixes technical test breaks only for the installed runner | Conditional |
| `sync-validator` | Audits consistency between all executor surfaces | Standalone |

## Cycle

```text
qa-cycle
  -> discovery      [projects/<slug>/README.md + source -> docs/technical/<slug>/]
  -> test-planner   [docs/technical/<slug>/ -> test-case-repository/repository/<slug>/]
  -> test-generator [conditional: requires installed runner]
  -> test-runner    [conditional: requires generated tests and installed runner]
      -> functional failure -> bug-auditor
      -> technical break    -> test-healer
```

## Rules

- Never skip discovery.
- Stop if the target project is not registered.
- Keep `projects/` limited to project metadata, README, and source code.
- Keep cases and specs in `test-case-repository/`.
- Keep generated technical documentation in `docs/technical/`.
- Stop before test generation when no runner is installed.
- Never create runner files in the workspace core.
- Never fix a failing assertion to make a test pass.
- Never invent domain rules not grounded in project README or source code.
- Never modify the registered project's source code without explicit user request.
- Treat `.agents/context/anti-hallucination.md` as mandatory context for every agent.
- Use `.agents/contracts/<active-agent>.md` as the active role contract.
- Use skills only for procedural work that belongs outside always-loaded context.

## Project Registration Contract

Before running discovery, the target project must exist in `projects/<slug>/`.

Required files:

- `projects/<slug>/project.json`
- `projects/<slug>/README.md`

Recommended source location:

- `projects/<slug>/source/`

Run `npm run register-project`.

## Traceability Contract

Traceability flows through four layers:

```text
docs/technical/<slug>/modules/<module>/
  -> test-case-repository/repository/<slug>/requirements/
  -> test-case-repository/repository/<slug>/cases/
  -> test-case-repository/repository/<slug>/specs/
  -> automation/<slug>/<runner>/ [future, optional]
```

Test ID format: `TC-<PROJECT>-<DOMAIN>-<NUMBER>`.

## Skills

| Skill | Purpose | Scope |
|---|---|---|
| `skills/discovery/SKILL.md` | Discovery and reverse-engineering protocol | Used by `discovery` |
| `skills/qa-env/SKILL.md` | Workspace and environment verification | Standalone |
