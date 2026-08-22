# Porto Seguro - Architecture Notes

## Application Shape

[FACT] The site is a public web portal served from `https://www.portoseguro.com.br`.

[FACT] Several pages expose HTML content that can be read without authentication.

[FACT] Some product pages return a loading shell in static access and depend on client-side rendering.

## Frontend

[INFERRED] The public site uses client-side JavaScript for product journeys such as Seguro Viagem and Seguro Auto.

[TO VERIFY] The exact framework is not confirmed from the available repository context.

## APIs

[INFERRED] Product cards, coupons, and quote flows may call public or semi-public APIs from the frontend.

[TO VERIFY] API endpoints must be captured with Playwright network tools before direct API tests are created.

## Authentication

[FACT] `Area do Cliente` points to an authenticated external customer area.

[FACT] Authentication is outside the v1 automation scope.

## Test Boundaries

[FACT] Runner-specific files belong under `automation/porto-seguro/playwright`.

[FACT] The workspace root must remain runner-agnostic.
