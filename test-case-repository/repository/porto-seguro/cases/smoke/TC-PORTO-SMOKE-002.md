# TC-PORTO-SMOKE-002 - Header exibe links publicos sem acessar login

## Metadata

- Project: `porto-seguro`
- Domain: `smoke`
- Module: `home`
- Priority: High
- Type: Functional
- Automation: Planned

## Objective

Validar que os links publicos do header aparecem sem acessar areas autenticadas.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/` is reachable.
- No login is used.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Header labels | Seguros, Servico, Bank, Saude, Area do Cliente | Validate public navigation visibility. |

## Steps

```gherkin
Funcionalidade: Header publico Porto Seguro

  Cenario: TC-PORTO-SMOKE-002 - Header exibe links publicos sem acessar login
    Dado que o visitante acessa `/`
    Entao o header deve exibir os links `Seguros`, `Servico`, `Bank` e `Saude`
    E o link `Servico` deve apontar para `/servicos`
    E o link `Bank` deve apontar para `/bank`
    E o link `Saude` deve apontar para `/porto-seguro-saude`
    E o link `Area do Cliente` deve estar visivel
    E o teste nao deve clicar em `Area do Cliente`
```

## Expected Result

- Os links publicos do header ficam visiveis.
- Os links publicos apontam para rotas publicas esperadas.
- O link `Area do Cliente` fica visivel.
- O teste nao navega para login.

## Observable Elements

- Header links: Seguros, Servico, Bank, Saude.
- Header hrefs: `/servicos`, `/bank`, `/porto-seguro-saude`.
- External authenticated link: Area do Cliente.

## Coverage

- Requirement: `REQ-PORTO-SMOKE-002`.
- Business rule: Public navigation is discoverable without authentication.
- Technical evidence: `docs/technical/porto-seguro/routes.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: use web-first assertions.
- Risks: header labels may vary by responsive layout.
