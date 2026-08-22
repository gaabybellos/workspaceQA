# Porto Seguro - Technical Overview

## Purpose

[FACT] Porto Seguro is a public web portal for insurance, financial products, health, and services.

[FACT] The registered base URL is `https://www.portoseguro.com.br`.

[FACT] The project scope for this workspace is public QA automation for a hiring assessment.

## Automation Scope

[FACT] The automation must not use login.

[FACT] The automation must not access `Area do Cliente`.

[FACT] The automation must not complete purchase, contracting, payment, or real scheduling.

[FACT] The automation runner selected for this project is Playwright.

[FACT] Playwright files must live only under `automation/porto-seguro/playwright`.

## Source Status

[FACT] `projects/porto-seguro/project.json` has `source_path` set to `null`.

[FACT] No application source code is available in `projects/porto-seguro/source/`.

[TO VERIFY] Component names, API contracts, and internal route handlers require browser/runtime discovery.

## Public Areas

[FACT] The home page exposes public navigation, product cards, service cards, and promotional coupons.

[FACT] `/servicos` exposes public service categories, service cards, coupon text, and FAQ content.

[FACT] `/seguro-viagem` and `/seguro-auto` are SPA-rendered pages that require a browser runtime for precise UI discovery.

## Test Architecture Recommendation

[FACT] Use JavaScript Playwright tests.

[FACT] Use Allure for reporting.

[INFERRED] Keep the initial suite small: smoke, coupon, services, safe Seguro Viagem entry point, and controlled network interception.

[INFERRED] Prefer UI tests for public content and `page.route()` for controlled API/error behavior.
