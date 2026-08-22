# Porto Seguro - Test Architecture Plan

## Runner

[FACT] Use Playwright.

[FACT] Use JavaScript.

[FACT] Place runner files under `automation/porto-seguro/playwright`.

## Reporting

[FACT] Use Allure Report.

[INFERRED] Include the test case ID in the test title and Allure metadata.

## Test Layers

| Layer | Purpose |
|---|---|
| Smoke UI | Validate public home and navigation availability. |
| UI functional | Validate public coupons, service cards, and FAQ. |
| Safe E2E | Validate only non-final Seguro Viagem entry behavior when stable. |
| Network/intercept | Validate controlled error behavior without relying on private API contracts. |

## Initial Playwright Structure

```text
automation/porto-seguro/playwright/
  playwright.config.js
  .env.example
  src/
    fixtures/base.fixture.js
    pages/HomePage.js
    pages/ServicosPage.js
    components/HeaderComponent.js
    components/CupomComponent.js
  tests/
    smoke/
    ui/
    api/
```

## Rules

- Do not use login.
- Do not complete purchase, contracting, payment, or scheduling.
- Do not use real personal data.
- Do not use `waitForTimeout` in specs.
- Prefer accessible locators.
- Use trace, screenshot, and video only for failures.
- Use retries only in CI.
- Keep tests independent.
