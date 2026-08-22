# TC-PORTO-VIAG-001 - Seguro Viagem exibe campanha, planos, coberturas e CTAs publicos

## Metadata

- Project: `porto-seguro`
- Domain: `viag`
- Module: `seguro-viagem`
- Priority: Medium
- Type: UI
- Automation: Automated

## Objective

Validar que a landing publica de Seguro Viagem exibe campanha, planos, coberturas e CTAs sem iniciar cotacao.

## Pre-conditions

- Browser runtime can render `/seguro-viagem`.
- No personal data is entered.
- No CTA is clicked.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Route | `/seguro-viagem` | Abrir a landing publica de Seguro Viagem. |
| Coupon | `TORCIDA50` | Validate public campaign content. |

## Steps

```gherkin
Funcionalidade: Landing publica de Seguro Viagem

  Cenario: TC-PORTO-VIAG-001 - Landing exibe campanha, planos, coberturas e CTAs publicos
    Dado que o visitante acessa `/seguro-viagem`
    Entao o titulo da pagina deve indicar `Seguro Viagem`
    E a campanha deve exibir desconto e cupom `TORCIDA50`
    E o CTA `Contrate ja` deve estar visivel e habilitado
    E a secao `Conheca nossos planos` deve estar visivel
    E pelo menos dois planos devem estar visiveis
    E o CTA `Cote agora` deve estar visivel e habilitado
    E a secao de coberturas deve estar visivel
    E a cotacao nao deve ser iniciada
```

## Expected Result

- A landing de Seguro Viagem carrega sem autenticacao.
- A campanha publica exibe desconto e cupom.
- Os planos e as coberturas ficam visiveis.
- Os CTAs publicos ficam visiveis e habilitados.
- Nenhuma navegacao para cotacao, compra ou envio de dados pessoais ocorre.

## Observable Elements

- Page title: Seguro Viagem.
- Campaign: discount text and coupon `TORCIDA50`.
- CTA: `Contrate ja`.
- Section: `Conheca nossos planos`.
- Plan cards: `Plano Europa basico`, `Plano mundo basico`.
- CTA: `Cote agora`.
- Coverage section: `Coberturas que fazem a diferenca na sua viagem`.

## Coverage

- Requirement: `REQ-PORTO-VIAG-001`.
- Business rule: Public quote journey must be discoverable.
- Technical evidence: `docs/technical/porto-seguro/modules/seguro-viagem/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: SPA rendering must be confirmed by browser runtime and web-first assertions.
- Risks: campaign prices may change; do not assert exact price values.
