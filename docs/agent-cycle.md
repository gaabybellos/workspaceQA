# Agent Cycle Reference

## Overview

```text
qa-cycle -> discovery -> test-planner -> test-generator -> test-runner
```

`test-generator` and `test-runner` are conditional.
They require a runner installed for the project.

## Phase 1 - discovery

Input:

- `projects/<slug>/project.json`
- `projects/<slug>/README.md`
- `projects/<slug>/source/`, when available

Output:

- `docs/technical/<slug>/overview.md`
- `docs/technical/<slug>/architecture.md`
- `docs/technical/<slug>/source-map.md`
- `docs/technical/<slug>/routes.md`
- `docs/technical/<slug>/entities.md`
- `docs/technical/<slug>/risks.md`
- `docs/technical/<slug>/test-architecture-plan.md`
- `docs/technical/<slug>/modules/`

## Phase 2 - test-planner

Input:

- `docs/technical/<slug>/`
- `test-case-repository/templates/`

Output:

- `test-case-repository/repository/<slug>/requirements/`
- `test-case-repository/repository/<slug>/cases/`
- `test-case-repository/repository/<slug>/specs/`
- `test-case-repository/repository/<slug>/numbering.md`

## Phase 3 - test-generator

Input:

- `test-case-repository/repository/<slug>/specs/`
- installed runner folder
- `docs/technical/<slug>/test-architecture-plan.md`

If no runner is installed, stop and report the required installation step.

## Phase 4 - test-runner

Input:

- generated tests
- installed runner folder

Classify failures as:

| Type | Meaning | Next Step |
|---|---|---|
| Functional failure | App behavior differs from spec | `bug-auditor` |
| Technical break | Test, selector, wait, import, or runner issue | `test-healer` |

## Stopping Rules

- Stop if discovery has not run.
- Stop if specs do not exist.
- Stop before generation when no runner is installed.
- Stop on functional failures after reporting root cause.
