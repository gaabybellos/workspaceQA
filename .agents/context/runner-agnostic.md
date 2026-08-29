# Runner-Agnostic Contract

workspaceQA is not a Playwright, Cypress, Selenium, or runner project.

## Core Rule

Do not add runner-specific files to the workspace core.

## Allowed Locations

Runner-specific files are allowed only under:

```text
automation/<slug>/<runner>/
```

## Forbidden In The Core

- `playwright.config.*`
- `cypress.config.*`
- browser install scripts
- runner fixtures
- runner workflows
- generated tests
- runner reports

## Agent Rule

`test-generator`, `test-runner`, and `test-healer` may use a runner only after `projects/<slug>/project.json` declares `automation.installed = true`.

