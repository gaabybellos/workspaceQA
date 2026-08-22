# TC-PORTO-SERV-002 - FAQ de servicos expande pergunta e mostra resposta

## Metadata

- Project: `porto-seguro`
- Domain: `servicos`
- Module: `servicos`
- Priority: Medium
- Type: Functional
- Automation: Planned

## Objective

Validate that users can access FAQ content on the public services page.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/servicos` is reachable.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| FAQ question | `O que e a Porto Servico?` | Expand public FAQ content. |

## Steps

1. Open `/servicos`.
2. Navigate to the FAQ section.
3. Expand the question about Porto Servico.
4. Observe the answer.

## Expected Result

- The selected FAQ question expands.
- The answer text is visible.

## Observable Elements

- FAQ heading.
- Question text.
- Answer text.

## Coverage

- Requirement: `REQ-PORTO-SERV-002`.
- Business rule: User can self-serve service information.
- Technical evidence: `docs/technical/porto-seguro/modules/servicos/README.md`.

## Automation Notes

- Recommended layer: UI.
- Cleanup: none.
- Async behavior: scroll may be required.
- Risks: FAQ may render expanded by default.
