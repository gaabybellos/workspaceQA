# TC-PORTO-API-002 - Modelo publico de Seguro Viagem retorna conteudo da landing

## Metadata

- Project: `porto-seguro`
- Domain: `api`
- Module: `seguro-viagem`
- Priority: Medium
- Type: Regression
- Automation: Planned

## Objective

Validate that the public Seguro Viagem content model is reachable and contains the page title.

## Pre-conditions

- Target URL `https://www.portoseguro.com.br/seguro-viagem.model.json` is reachable.

## Test Data

| Data | Value | Purpose |
|---|---|---|
| Endpoint | `/seguro-viagem.model.json` | Validate public content model. |

## Steps

1. Send a GET request to `/seguro-viagem.model.json`.
2. Observe the HTTP status.
3. Parse the JSON response.
4. Validate the page title field.

## Expected Result

- The endpoint returns HTTP 200.
- The response is valid JSON.
- The response title contains `Seguro Viagem`.

## Observable Elements

- HTTP status.
- JSON title.
- JSON component metadata.

## Coverage

- Requirement: `REQ-PORTO-API-001`.
- Business rule: Public landing content is available to the frontend.
- Technical evidence: `automation/porto-seguro/documentacao/descoberta/03-seguro-viagem-investigacao-playwright.md`.

## Automation Notes

- Recommended layer: API.
- Cleanup: none.
- Async behavior: none.
- Risks: content model schema may evolve.
