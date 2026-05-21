# SKILL.md - discovery

## Purpose

Perform project discovery and reverse engineering before test planning or runner installation.

## Input Sources

Read in this order:

| Source | Required | What To Extract |
|---|---|---|
| `projects/<slug>/project.json` | Yes | metadata, base URL, source path, runner state |
| `projects/<slug>/README.md` | Yes | product rules, flows, roles, entities, constraints |
| `projects/<slug>/source/` | Recommended | routes, modules, components, APIs, schemas, integrations |
| `api_docs_url` | Optional | endpoint contracts and response shapes |

## Output Files

Write technical documentation to:

```text
docs/technical/<slug>/
  overview.md
  architecture.md
  source-map.md
  routes.md
  entities.md
  risks.md
  test-architecture-plan.md
  modules/
    <module>/
      README.md
      business-rules.md
      endpoints.md
      components.md
      test-data.md
      risks.md
```

## Process

1. Read project metadata.
2. Read the project README.
3. Read source code when `source_path` exists.
4. Map modules, routes, components, APIs, entities, dependencies, and risks.
5. Separate facts, inferences, and gaps.
6. Write technical documentation.
7. Recommend a test architecture.
8. Do not create test cases, specs, or runner files.

## Markers

| Marker | Meaning |
|---|---|
| `[FACT]` | Directly stated in README or source code |
| `[INFERRED]` | Derived from source patterns |
| `[TO VERIFY]` | Needs live app or user confirmation |

## Quality Checklist

- [ ] Product purpose and target user stated.
- [ ] Source path status documented.
- [ ] Key modules mapped.
- [ ] Routes or entry points mapped.
- [ ] Key entities mapped.
- [ ] Access rules mapped when present.
- [ ] Key flows documented.
- [ ] Test data needs documented.
- [ ] Risks documented.
- [ ] Test architecture recommendation written.

If fewer than 6 points pass, stop and ask the user to enrich `projects/<slug>/README.md`.

## Rules

- Never install or create runner files.
- Never create cases or specs in `projects/`.
- Never invent domain rules.
- Never modify the target project source without explicit user request.
- Treat missing data as `[TO VERIFY]`.
