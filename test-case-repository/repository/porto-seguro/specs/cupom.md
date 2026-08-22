# Cupom

## Sources

- Technical documentation: `docs/technical/porto-seguro/modules/home/README.md`
- Requirement: `test-case-repository/repository/porto-seguro/requirements/public-site.md`
- Cases:
  - `test-case-repository/repository/porto-seguro/cases/cupom/TC-PORTO-CUPOM-001.md`
  - `test-case-repository/repository/porto-seguro/cases/cupom/TC-PORTO-CUPOM-002.md`

## Preconditions

- The public home page is reachable.
- Coupon campaign is active or expected coupon is configured.

## Scenarios

### TC-PORTO-CUPOM-001 - Cupom publico aparece com botao copiar

**Steps:**
1. Open `/`.
2. Locate the public coupon section.
3. Verify the expected coupon text is visible.
4. Verify the copy action is visible.

**Expected result:** Public coupon information is visible to the user.

**Observable elements:**
- Coupon label.
- Coupon code.
- Copy action.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: read expected coupon from environment variable.

### TC-PORTO-CUPOM-002 - Clipboard recebe o cupom quando permitido

**Steps:**
1. Grant clipboard permissions.
2. Open `/`.
3. Click the coupon copy action.
4. Read the clipboard.
5. Compare clipboard text with expected coupon value.

**Expected result:** Clipboard contains the expected coupon value.

**Observable elements:**
- Copy action.
- Clipboard text.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: skip or mark as candidate if the browser blocks clipboard permission.
