# TC-PORTO-CUPOM-001 - Cupom publico aparece com botao copiar

## Metadata

- Project: `porto-seguro`
- Domain: `cupom`
- Module: `home`
- Priority: Medium
- Type: Functional
- Automation: Planned

## Objective

Validate that a public promotional coupon is visible with a copy action.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/` is reachable.
- Campaign content is active.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Expected coupon | `TORCIDA50` | Validate visible campaign code when active. |

## Steps

1. Open `/`.
2. Observe the promotional coupon area.
3. Observe coupon text.
4. Observe the copy action.

## Expected Result

- A coupon code is visible.
- A copy action is visible near the coupon.

## Observable Elements

- Text: `Cupom`.
- Coupon: `TORCIDA50`.
- Button or action: `Copiar`.

## Coverage

- Requirement: `REQ-PORTO-CUPOM-001`.
- Business rule: Public campaign code is visible to the user.
- Technical evidence: `docs/technical/porto-seguro/modules/home/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: campaign area may render after page load.
- Risks: coupon value can change; store expected value in `.env`.
