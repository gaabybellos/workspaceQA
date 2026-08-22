# TC-PORTO-CUPOM-002 - Clipboard recebe o cupom quando permitido

## Metadata

- Project: `porto-seguro`
- Domain: `cupom`
- Module: `home`
- Priority: Medium
- Type: Functional
- Automation: Planned

## Objective

Validate that the copy action places the coupon value in the browser clipboard when permission is available.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/` is reachable.
- Browser context grants clipboard permissions.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Expected coupon | `TORCIDA50` | Validate copied text. |

## Steps

1. Open `/`.
2. Grant clipboard read and write permissions.
3. Click the coupon copy action.
4. Read clipboard text.

## Expected Result

- Clipboard contains the expected coupon value.

## Observable Elements

- Button or action: `Copiar`.
- Browser clipboard text.

## Coverage

- Requirement: `REQ-PORTO-CUPOM-001`.
- Business rule: User can copy campaign code.
- Technical evidence: `docs/technical/porto-seguro/modules/home/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: clear or overwrite clipboard if needed.
- Async behavior: clipboard API may require permissions.
- Risks: browser policies may block clipboard in some environments.
