# Workspace Rules

Read this context before running any workspaceQA agent.

## Authority Order

1. `AGENTS.md`
2. `docs/writing-standards.md`
3. `.agents/registry.yaml`
4. `.agents/context/*.md`
5. `.agents/contracts/<agent>.md`
6. Executor-specific adapter

## Required Behavior

- Stop if the target project is not registered in `projects/<slug>/`.
- Run discovery before planning, generation, or execution.
- Keep discovery output in `docs/technical/<slug>/`.
- Keep requirements, cases, and specs in `test-case-repository/repository/<slug>/`.
- Keep runner-specific automation in `automation/<slug>/<runner>/`.
- Keep `projects/` limited to metadata, README files, and source code.
- Read `docs/writing-standards.md` before creating or editing files.

