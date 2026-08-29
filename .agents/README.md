# Agent Canonical Context

`.agents/` is the canonical agent context for workspaceQA.

`AGENTS.md` remains the durable governance entry point.
Executor-specific surfaces are compatibility adapters.
They must point back to this folder when they exist.

## Structure

```text
.agents/
  registry.yaml
  context/
    anti-hallucination.md
    runner-agnostic.md
    traceability.md
    workspace-rules.md
  contracts/
    <agent>.md
```

## Usage

Read sources in this order:

1. `AGENTS.md`
2. `docs/writing-standards.md`
3. `.agents/registry.yaml`
4. `.agents/context/*.md`
5. `.agents/contracts/<agent>.md`

Read executor-specific adapters only when the active tool requires them to invoke a native agent.

## Rules

- Treat `.agents/contracts/` as the source of truth for agent behavior.
- Treat `.claude/agents/`, `.opencode/prompts/`, and `.codex/agents/` as optional adapters.
- Keep adapters semantically equivalent to their canonical contracts.
- Run `npm run validate-agent-sync` after changing agent context.
- Run `npm run check-workspace` before a QA cycle.
