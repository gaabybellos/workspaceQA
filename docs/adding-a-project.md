# Adding A Project

## Register The Project

```bash
npm run register-project
```

The script asks for:

- project slug;
- display name;
- short description;
- base URL;
- Git repository URL or existing local source path;
- branch;
- project type.

If a Git repository URL is provided, the script clones it into:

```text
projects/<slug>/source/
```

## Project Folder

```text
projects/<slug>/
  project.json
  README.md
  source/
```

`projects/` stores only project metadata, project README, and source code.
Do not put cases, specs, docs, or automation files inside `projects/`.

## Project README

Edit `projects/<slug>/README.md`.
Discovery uses it as the business entry point.

Use `To verify` for unknown sections.

## Next Steps

```text
@discovery <slug>
```

Discovery writes technical documentation to:

```text
docs/technical/<slug>/
```

Then:

```text
@test-planner <slug>
```

The planner writes cases and specs to:

```text
test-case-repository/repository/<slug>/
```
