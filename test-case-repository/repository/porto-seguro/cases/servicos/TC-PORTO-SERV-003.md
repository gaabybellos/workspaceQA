# TC-PORTO-SERV-003 - CEP valido habilita compra e abre selecao de limpeza

## Metadata

- Project: `porto-seguro`
- Domain: `servicos`
- Module: `servico-individual`
- Priority: High
- Type: Regression
- Automation: Automated

## Objective

Validar que um CEP valido identifica o endereco, habilita o CTA de compra e abre o modal de opcoes de limpeza.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/servicos/limpeza-de-ar-condicionado` is reachable.
- No login is used.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| CEP | `01310-100` | Trigger service availability validation. |

## Steps

```gherkin
Funcionalidade: Habilitacao de compra por CEP em Porto Servico

  Cenario: TC-PORTO-SERV-003 - CEP valido identifica endereco, habilita compra e abre opcoes de limpeza
    Dado que o visitante esta em `/servicos/limpeza-de-ar-condicionado`
    E que o visitante nao esta autenticado
    E o botao `Compre agora` esta desabilitado
    Quando o visitante informa o CEP `01310-100`
    E pressiona Enter no campo CEP
    Entao o endereco do CEP deve ser identificado
    E o botao `Compre agora` deve ficar habilitado
    Quando o visitante seleciona `Compre agora`
    Entao o modal de opcoes de limpeza deve ser exibido
    E o modal deve listar opcoes de quantidade para `limpeza de ar-condicionado`
    E a compra nao deve ser concluida
```

## Expected Result

- O CEP valido identifica o endereco `Avenida Paulista`.
- O CEP valido habilita `Compre agora`.
- O botao habilitado permite clique em `Compre agora`.
- O clique em `Compre agora` abre o modal `Selecione a opcao`.
- O modal lista opcoes de quantidade de limpeza.
- Nenhuma compra e concluida.

## Observable Elements

- CEP input.
- Endereco identificado.
- `Compre agora` button.
- `Selecione a opcao` modal.
- Quantity option buttons.

## Coverage

- Requirement: `REQ-PORTO-SERV-001`.
- Business rule: Public service pages allow users to check service availability by CEP.
- Technical evidence: `docs/technical/porto-seguro/modules/servicos/README.md`.

## Automation Notes

- Recommended layer: E2E UI.
- Cleanup: close the modal when needed.
- Async behavior: CEP validation happens after pressing Enter in the CEP field and may update the identified address before enabling the CTA.
- Risks: CEP coverage may vary by public service availability rules.
