# Traceability Rules

Traceability is mandatory across discovery, planning, specs, and automation.

## Flow

```text
docs/technical/<slug>/modules/<module>/
  -> test-case-repository/repository/<slug>/requirements/
  -> test-case-repository/repository/<slug>/cases/
  -> test-case-repository/repository/<slug>/specs/
  -> automation/<slug>/<runner>/ [conditional]
```

## ID Format

```text
TC-<PROJECT>-<DOMAIN>-<NUMBER>
```

Rules:

- `PROJECT` is the uppercase project slug with at most 6 characters.
- `DOMAIN` is the uppercase domain name.
- `NUMBER` is a three-digit sequence.
- Every case, spec, and generated test must reference the same ID.

