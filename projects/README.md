# Projects

This folder stores registered target projects.

## Purpose

`projects/` is only for project metadata, project README files, and cloned source code.

## Structure

```text
projects/
  <slug>/
    project.json
    README.md
    source/
```

## Rules

- Do not store test cases in `projects/`.
- Do not store specs in `projects/`.
- Do not store generated technical docs in `projects/`.
- Do not store automation runner files in `projects/`.

Use:

- `docs/technical/<slug>/` for discovery output.
- `test-case-repository/repository/<slug>/` for requirements, cases, and specs.
- `automation/<slug>/<runner>/` for future runner-specific automation.
