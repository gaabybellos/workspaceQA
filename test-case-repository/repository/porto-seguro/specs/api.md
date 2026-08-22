# API And Network

## Sources

- Technical documentation: `docs/technical/porto-seguro/test-architecture-plan.md`
- Requirement: `test-case-repository/repository/porto-seguro/requirements/public-site.md`
- Case: `test-case-repository/repository/porto-seguro/cases/api/TC-PORTO-API-001.md`
- Case: `test-case-repository/repository/porto-seguro/cases/api/TC-PORTO-API-002.md`
- Automation: `automation/porto-seguro/playwright/tests/api/intercept.spec.js`

## Preconditions

- The public site is reachable.
- No authenticated area is accessed.
- No purchase, payment, contracting, or scheduling is completed.

## Scenarios

### TC-PORTO-API-001 - Inicializacao do wizard cria carrinho via POST

**Steps:**
1. Start waiting for `POST /content/rest/commerce/post/checkout/create-empty-cart.json`.
2. Open `/loja/seguro-viagem`.
3. Verify the observed request method is `POST`.
4. Verify the observed response status is `200`.
5. Verify the wizard exposes the `Seguir com a cotacao` button.

**Expected result:** The public wizard initializes its cart session and remains usable without submitting personal data.

**Observable elements:**
- HTTP method.
- Endpoint path.
- HTTP status.
- `Seguir com a cotacao` button.

**Automation guidance:**
- Recommended layer: API/Network hybrid.
- Runner-specific notes: use `Promise.all` with `page.waitForResponse()` and `page.goto()`.

### TC-PORTO-API-002 - Modelo publico de Seguro Viagem retorna conteudo da landing

**Steps:**
1. Send `GET /loja/seguro-viagem.model.json`.
2. Verify status is `200`.
3. Verify content type contains `application/json`.
4. Parse the JSON response.
5. Verify the body contains Seguro Viagem content.

**Expected result:** The public model endpoint is reachable and returns parseable Seguro Viagem content.

**Observable elements:**
- HTTP status.
- JSON content type.
- JSON body.
- Seguro Viagem content.

**Automation guidance:**
- Recommended layer: API.
- Runner-specific notes: use Playwright `request` fixture.
