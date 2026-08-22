# Seguro Viagem

## Sources

- Technical documentation: `docs/technical/porto-seguro/modules/seguro-viagem/README.md`
- Requirement: `test-case-repository/repository/porto-seguro/requirements/public-site.md`
- Case: `test-case-repository/repository/porto-seguro/cases/seguro-viagem/TC-PORTO-VIAG-001.md`

## Preconditions

- Browser runtime can render the public route.
- No personal data is entered.
- No CTA is clicked.

## Scenarios

### TC-PORTO-VIAG-001 - Seguro Viagem exibe campanha, planos, coberturas e CTAs publicos

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

**Expected result:** A landing publica de Seguro Viagem exibe campanha, planos, coberturas e CTAs sem iniciar cotacao.

**Observable elements:**
- Seguro Viagem title.
- Coupon `TORCIDA50`.
- `Contrate ja` CTA.
- `Conheca nossos planos`.
- Plan cards.
- `Cote agora` CTA.
- Coverage section.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: use role/text locators and web-first assertions; do not assert exact prices; do not click CTAs.
