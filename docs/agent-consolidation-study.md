# Agent Consolidation Study

This study defines how workspaceQA should reduce duplicated agent context while preserving AI executor compatibility.

## Confirmed Sources

| Tool | Confirmed Behavior | Source |
|---|---|---|
| Codex | Reads `AGENTS.md` as project instructions before work. | `https://developers.openai.com/codex/guides/agents-md` |
| OpenCode v2 | Uses discovered `AGENTS.md` files as active session instructions. | `https://opencode.ai/v2/docs/instructions` |
| Claude Code | Reads `CLAUDE.md` at session start. Use `@AGENTS.md` to import shared agent instructions. | `https://code.claude.com/docs/en/memory` |
| Claude Code subagents | Project subagents live in `.claude/agents/` when native Claude subagent invocation is required. | `https://code.claude.com/docs/en/sub-agents` |
| OpenCode agents | Project agents can live in `.opencode/agents/<name>.md` in OpenCode v2. | `https://opencode.ai/v2/docs/agents/` |
| Skills | Skills are procedural instructions loaded when relevant, instead of always-loaded memory. | `https://code.claude.com/docs/en/slash-commands` |

## Current Workspace Finding

[FACT] `AGENTS.md` defines the durable workspace governance.

[FACT] `.agents/` now contains canonical context, shared rules, and role contracts.

[FACT] `skills/discovery/SKILL.md` contains the discovery and reverse-engineering procedure.

[FACT] `skills/qa-env/SKILL.md` contains environment operations outside the QA cycle.

[FACT] `.claude/agents/`, `.opencode/prompts/`, and `.codex/agents/` still exist as executor adapters.

[INFERRED] The adapter folders are useful only when an executor needs native agent registration.

[INFERRED] Duplicating full agent behavior across adapters increases drift and hallucination risk.

[TO VERIFY] Whether the local OpenCode version should use `.opencode/prompts/` or `.opencode/agents/`.

## Phase 1 Decision

Use `AGENTS.md` as the bootloader.
Use `.agents/` as the single source of truth.
Use `skills/` for procedures that should load on demand.
Treat executor-specific folders as compatibility adapters only.

## Required Boot Sequence

```text
AGENTS.md
  -> docs/writing-standards.md
  -> .agents/README.md
  -> .agents/registry.yaml
  -> .agents/context/workspace-rules.md
  -> .agents/context/anti-hallucination.md
  -> .agents/context/runner-agnostic.md
  -> .agents/context/traceability.md
  -> .agents/contracts/<active-agent>.md
```

## Anti-Hallucination Controls

- Keep governance in `AGENTS.md`.
- Keep role contracts in `.agents/contracts/`.
- Keep procedural instructions in `skills/`.
- Keep project facts in `projects/<slug>/README.md`.
- Keep discovered facts in `docs/technical/<slug>/`.
- Require `[FACT]`, `[INFERRED]`, and `[TO VERIFY]` in discovery output.
- Validate agent context with `npm run validate-agent-sync`.
- Validate workspace boundaries with `npm run check-workspace`.

## Phase 2 Findings

Do not delete executor folders until their native use is verified.

Evaluate these options:

| Area | Option | Risk | Recommendation |
|---|---|---|---|
| `.claude/agents/` | Delete all project subagents. | Claude loses native `@agent` delegation. | Delete only if Claude will operate through `CLAUDE.md` and `.agents/` without native subagents. |
| `.codex/agents/` | Delete TOML agent profiles. | Any local Codex flow using those profiles stops working. | Keep `.codex/config.toml`; remove `.codex/agents/` only after confirming no command depends on it. |
| `.opencode/prompts/` | Delete legacy prompt files. | Current `opencode.json` references them. | Migrate to `.opencode/agents/` or remove agent config after confirming OpenCode usage. |
| `CLAUDE.md` | Replace with `@AGENTS.md`. | Low. Claude official docs recommend this bridge. | Done in Phase 1. |
| Adapter content | Keep full duplicated prompts. | High drift and hallucination risk. | Replace with minimal pointers or generate adapters from `.agents/`. |

## Phase 2 Recommended Work

1. Verify local Claude, Codex, and OpenCode commands that invoke custom agents.
2. Decide whether native `@agent` invocation is required per tool.
3. Convert required adapters to minimal pointer files.
4. Remove unused adapter folders only after validation.
5. Add `scripts/generate-agent-adapters.js` if adapters remain.
6. Add `.agents/evals/` with anti-hallucination scenarios.

