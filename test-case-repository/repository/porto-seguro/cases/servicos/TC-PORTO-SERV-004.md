# TC-PORTO-SERV-004 - Orientacoes de servico individual abrem modal tecnico

## Metadata

- Project: `porto-seguro`
- Domain: `servicos`
- Module: `servico-individual`
- Priority: Medium
- Type: Regression
- Automation: Automated

## Objective

Validar que as orientacoes tecnicas de uma pagina publica de servico abrem em modal.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/servicos/limpeza-de-ar-condicionado` is reachable.
- No login is used.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Shortcut | `Especificacoes do aparelho` | Abrir o modal de orientacoes tecnicas. |

## Steps

```gherkin
Funcionalidade: Orientacoes tecnicas em Porto Servico

  Cenario: TC-PORTO-SERV-004 - Orientacoes de aparelho abrem modal tecnico
    Dado que o visitante esta em `/servicos/limpeza-de-ar-condicionado`
    E que o visitante nao esta autenticado
    Quando o visitante acessa `Orientacoes para este servico`
    E seleciona `Especificacoes do aparelho`
    Entao o modal tecnico deve ser exibido
    E o corpo do modal `.c-modal__body` deve existir
    E o modal deve exibir os requisitos do aparelho
    Quando o visitante fecha o modal
    Entao o modal tecnico deve deixar de ser exibido
```

## Expected Result

- O modal tecnico abre com os requisitos do aparelho.
- O corpo `.c-modal__body` existe no modal aberto.
- O modal fecha pelo botao `Fechar modal`.
- Nenhuma compra e concluida.

## Observable Elements

- `Especificacoes do aparelho` shortcut.
- Modal tecnico.
- `.c-modal__body`.
- Requisitos tecnicos do aparelho.
- `Fechar modal` button.

## Coverage

- Requirement: `REQ-PORTO-SERV-002`.
- Business rule: Public service pages expose guidance before purchase.
- Technical evidence: `docs/technical/porto-seguro/modules/servicos/README.md`.

## Automation Notes

- Recommended layer: E2E UI.
- Cleanup: close the modal.
- Async behavior: modal overlay blocks the page while open.
- Risks: shortcut text can render with accents; prefer stable modal attributes when available.
