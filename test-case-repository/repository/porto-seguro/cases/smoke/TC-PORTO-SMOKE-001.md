# TC-PORTO-SMOKE-001 - Home carrega com logo, menu principal e conteudo publico

## Metadata

- Project: `porto-seguro`
- Domain: `smoke`
- Module: `home`
- Priority: High
- Type: Functional
- Automation: Planned

## Objective

Validar que a home publica esta disponivel e exibe os principais pontos de entrada.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/` is reachable.
- No login is required.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Base URL | `https://www.portoseguro.com.br` | Open the public site. |

## Steps

```gherkin
Funcionalidade: Smoke da home publica Porto Seguro

  Cenario: TC-PORTO-SMOKE-001 - Home carrega com logo e conteudo publico
    Dado que o visitante acessa `/`
    Entao o titulo da pagina deve indicar Porto Seguro
    E o logo da Porto deve estar visivel
    E ao menos uma secao publica de produto ou servico deve estar visivel
    E nenhuma area autenticada deve ser acessada
```

## Expected Result

- A home carrega sem autenticacao.
- O logo da Porto fica visivel.
- Conteudo publico de produto ou servico fica visivel.
- Nenhuma navegacao para login e realizada.

## Observable Elements

- Logo: Porto.
- Content: Seguro Viagem, Seguro Auto, or Servicos.

## Coverage

- Requirement: `REQ-PORTO-SMOKE-001`.
- Business rule: Public entry must be available.
- Technical evidence: `docs/technical/porto-seguro/modules/home/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: wait for visible page elements.
- Risks: campaign content may change; validate stable product or service sections instead of one rotating banner.
