# Writing Standards - workspaceQA

Read this document before creating or editing any file in this workspace.

## General Principles

**Objective.** One sentence = one idea.

**Precise.** Use real paths and names. Write `projects/<name>/project.json`, not "the file".

**Traceable.** Every case, spec, and generated test has an ID.

**Imperative.** Write rules as commands.

**No filler.** Cut vague language.

## Runner-Agnostic Rule

The workspace core must not contain Playwright, Cypress, or any other runner configuration.

Runner-specific files belong only under a registered project after a runner installation flow creates them:

```text
automation/<slug>/<runner>/
```

Do not add runner configs, runner workflows, browser install steps, or runner fixtures to the workspace root.

## Documentation Sync

Update documentation in the same change as behavior:

| Change | Required Doc Review |
|---|---|
| Script behavior | `README.md` and `docs/adding-a-project.md` |
| Agent behavior | `AGENTS.md` and `docs/agent-cycle.md` |
| Project schema | `projects/_template/project.json` and `docs/adding-a-project.md` |
| Discovery output | `skills/discovery/SKILL.md` and `docs/how-it-works.md` |
| Runner installation | `README.md` and runner-specific docs created by that installation |
| Executor adapter or config (`.claude/`, `.opencode/`, `.codex/`) | `docs/agent-contracts-study.md` |

## Agent Definitions

- Start with a role statement.
- List mandatory sources before rules.
- State input and output explicitly.
- Keep all three surfaces semantically equivalent:
  - `.agents/contracts/<name>.md`
  - `.claude/agents/<name>.md`
  - `.opencode/prompts/<name>.md`
  - `.codex/agents/<name>.toml`
- Treat `.agents/contracts/<name>.md` as the source of truth.
- Treat executor-specific files as adapters.
- Do not add new agent behavior only to an executor-specific adapter.

## Project README

Every registered project README must include:

| Section | What It Must Contain |
|---|---|
| What It Does | Product purpose and target user |
| User Roles And Permissions | Role, allowed behavior, blocked behavior |
| Key User Flows | Important journeys and route/screen transitions |
| Routes And Access Requirements | Route or entry point, access, role, screen or handler |
| Key Entities | Entity, key fields, relationships |
| Tech Stack | Frontend, backend, database, APIs, auth, integrations |
| Module Dependency Graph | Module order and dependencies |
| Test Data Requirements | Seeds, records, users, cleanup rules |
| Known Complexity | Async behavior, queues, external integrations, risks |

If a section is unknown, write `To verify`.

## Discovery And Analysis Files

Discovery output must separate facts, inferences, and gaps:

| Marker | Meaning |
|---|---|
| `[FACT]` | Directly stated in README or source |
| `[INFERRED]` | Derived from code patterns or naming |
| `[TO VERIFY]` | Needs confirmation in the live app or by the user |

## Folder Boundaries

- Keep cloned source in `projects/<slug>/source/`.
- Keep generated technical documentation in `docs/technical/<slug>/`.
- Keep requirements, cases, and specs in `test-case-repository/repository/<slug>/`.
- Keep future runner-specific automation in `automation/<slug>/<runner>/`.

## Functional Cases

- Use the same ID that the spec will use.
- Write business intent, not implementation detail.
- Include pre-conditions, steps, expected result, and automation notes.

## Specs

- Title: `# <Module Name>`.
- Every test case title starts with `TC-<PROJECT>-<DOMAIN>-<NUMBER>`.
- Steps use observable user actions.
- Expected results are observable outcomes.
- One spec file per module.

## Test ID Format

```text
TC-<PROJECT>-<DOMAIN>-<NUMBER>
```

- `PROJECT`: uppercase slug, max 6 characters.
- `DOMAIN`: uppercase domain name.
- `NUMBER`: three-digit sequence.

Example: `TC-SHOP-CATALOG-001`.
