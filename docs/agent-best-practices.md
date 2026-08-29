# Agent Best Practices

Use this guide to operate workspaceQA with consistent context across AI executors.

## Context Model

`AGENTS.md` is the repository governance file.
`.agents/` is the canonical agent context.
Executor folders are compatibility adapters.

```text
AGENTS.md
  -> .agents/registry.yaml
  -> .agents/context/*.md
  -> .agents/contracts/<agent>.md
```

Do not place new behavior in executor adapters.
Place behavior in `.agents/contracts/<agent>.md`.

## How To Use Agents

Start with `qa-cycle` for a normal project flow.

```text
@qa-cycle <slug>
```

Run `discovery` directly only when you need to refresh technical documentation.

```text
@discovery <slug>
```

Run `test-planner` only after discovery output exists.

```text
@test-planner <slug>
```

Run `test-generator` only after `projects/<slug>/project.json` declares an installed runner.

```text
@test-generator <slug>
```

Run `test-runner` only inside the installed project runner flow.

```text
@test-runner <slug>
```

Use `bug-auditor` for product failures.
Use `test-healer` for technical test breaks.
Use `sync-validator` after changing agent behavior.

## Anti-Hallucination Practice

- Read source files before drawing conclusions.
- Separate `[FACT]`, `[INFERRED]`, and `[TO VERIFY]`.
- Do not turn unknowns into expected results.
- Do not invent selectors, endpoints, roles, business rules, or test data.
- Use project README and source code as the domain authority.

## Performance Practice

- Give each agent only the context needed for its phase.
- Keep project facts in `projects/<slug>/README.md`.
- Keep reverse-engineered facts in `docs/technical/<slug>/`.
- Keep reusable agent rules in `.agents/context/`.
- Keep agent-specific behavior in `.agents/contracts/<agent>.md`.
- Keep executor adapters short when they are required by a tool.
- Avoid copying large source files into prompts unless discovery needs them.

## Clean Workspace Practice

- Do not add runner files to the workspace core.
- Put runner automation only under `automation/<slug>/<runner>/`.
- Put specs only under `test-case-repository/repository/<slug>/specs/`.
- Put cases only under `test-case-repository/repository/<slug>/cases/`.
- Put discovery docs only under `docs/technical/<slug>/`.
- Keep generated tests linked to `TC-*` IDs.

## Validation Commands

Use `npm.cmd` on Windows PowerShell when `npm.ps1` is blocked.

```bash
npm run check-workspace
npm run validate-agent-sync
```

## Related Study

`docs/agent-contracts-study.md` verifies this architecture against the official documentation of Claude Code, OpenCode, Codex, and the `AGENTS.md` open standard, and tracks open gaps. Review it after any change under `.claude/`, `.opencode/`, or `.codex/`.
