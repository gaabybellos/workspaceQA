# Anti-Hallucination Rules

Apply these rules to every workspaceQA agent.

## Evidence Rules

- Read local sources before making claims.
- Mark source-backed statements as `[FACT]`.
- Mark code-derived conclusions as `[INFERRED]`.
- Mark missing or unconfirmed details as `[TO VERIFY]`.
- Never invent routes, entities, business rules, APIs, roles, selectors, or test data.
- Never promote `[TO VERIFY]` information into a test expectation.

## Stop Rules

- Stop if `projects/<slug>/project.json` is missing.
- Stop if discovery output is missing before test planning.
- Stop before test generation when no runner is installed.
- Stop when failure classification is uncertain.

## Test Integrity

- Never change an assertion to hide a product bug.
- Never generate a test without a `TC-*` spec ID.
- Never modify registered project source without explicit user request.

