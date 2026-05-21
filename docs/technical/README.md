# Technical Documentation

This folder stores discovery and reverse-engineering output generated for registered projects.

## Structure

```text
docs/technical/
  <slug>/
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

## Rule

Do not place cloned source code here.
Source code belongs in `projects/<slug>/source/`.
