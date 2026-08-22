# Porto Seguro - Risks

## Functional Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Home navigation is unavailable | User cannot reach product journeys. | Smoke test public header and product CTAs. |
| Coupon is not visible or copy action fails | Promotional journey loses conversion value. | Test coupon visibility and clipboard when permitted. |
| Services page does not list categories or cards | Service discovery breaks. | Test public categories and cards. |
| FAQ interaction fails | User cannot self-serve answers. | Test one FAQ expansion. |
| Seguro Viagem SPA fails to render | Quote journey becomes unavailable. | Investigate with Playwright headed before automation. |

## Automation Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Test triggers real purchase or scheduling | Side effect in production. | Stop before final actions. |
| Login is required | Test cannot run without credentials. | Keep Area do Cliente out of scope. |
| Campaign text changes | Flaky tests. | Validate core behavior and configure coupon values in `.env`. |
| API contracts are unknown | Direct API tests may be invalid. | Use `page.route()` first; add direct API tests only after endpoint confirmation. |
| SPA selectors are unstable | Flaky UI tests. | Prefer role, label, and visible text locators. |
