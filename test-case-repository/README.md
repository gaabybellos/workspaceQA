# Test Case Repository

Official repository for requirements, test cases, and runner-agnostic specs generated or curated by workspaceQA.

## Structure

```text
test-case-repository/
  templates/
  repository/
    <slug>/
      requirements/
      cases/
      specs/
      numbering.md
```

## Rules

- Keep test cases outside `projects/`.
- Keep cases runner-agnostic.
- Use one stable ID per behavior.
- Link each case to its requirement, spec, and future automated test when automation exists.
- Do not store Playwright, Cypress, or runner-specific code here.

## Flow

```text
docs/technical/<slug>/ -> test-planner -> test-case-repository/repository/<slug>/
```
