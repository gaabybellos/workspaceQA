# TC-PORTO-SERV-001 - Servicos lista categorias e cards sem compra

## Metadata

- Project: `porto-seguro`
- Domain: `servicos`
- Module: `servicos`
- Priority: High
- Type: Functional
- Automation: Planned

## Objective

Validate that the public services page lists categories and service cards without requiring login.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/servicos` is reachable.
- No purchase action is completed.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Route | `/servicos` | Open services page. |

## Steps

1. Open `/servicos`.
2. Observe service categories.
3. Observe service cards.
4. Do not click final purchase actions.

## Expected Result

- Service categories are visible.
- At least one service card is visible.
- The test does not create a purchase or scheduling request.

## Observable Elements

- Categories: Limpeza, Encanador, Eletricista, Instalacao e Fixacao.
- Cards: service title and CTA text.

## Coverage

- Requirement: `REQ-PORTO-SERV-001`.
- Business rule: Public service discovery is available.
- Technical evidence: `docs/technical/porto-seguro/modules/servicos/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: cards may render after route load.
- Risks: service list can change.
