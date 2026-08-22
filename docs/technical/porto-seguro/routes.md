# Porto Seguro - Routes

## Public Routes

| Route | Access | Evidence | Automation Decision |
|---|---|---|---|
| `/` | Public | [FACT] Home shows header, categories, coupons, product cards, service cards, and footer links. | Automate smoke and coupon checks. |
| `/servicos` | Public | [FACT] Page shows service categories, coupons, cards, and FAQ content. | Automate service listing and FAQ checks. |
| `/seguro-viagem` | Public | [TO VERIFY] Static access returns a loading shell. | Investigate with Playwright before automating. |
| `/seguro-auto` | Public | [TO VERIFY] Static access returns a loading shell. | Document only in v1 unless stable. |

## External Routes

| Route | Access | Evidence | Automation Decision |
|---|---|---|---|
| `cliente.portoseguro.com.br` | Authenticated | [FACT] Linked as Area do Cliente. | Do not automate in v1. |
| WhatsApp and chat links | External | [FACT] Public links exist in service/help areas. | Do not automate side effects. |

## Route Risks

[TO VERIFY] Some CTAs may navigate to purchase or quote flows.

[FACT] Tests must stop before purchase, payment, contracting, or scheduling confirmation.
