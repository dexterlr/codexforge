# CodexForge Workspace Map

## Canonical source of truth

The active CodexForge product surface for this repository is the frontend app at:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

Use this path for CodexForge frontend source edits, build checks, smoke checks, docs, and reviewable app work.

Do not use duplicate or scratch copies unless a maintainer explicitly documents that a copy is canonical for a specific task.

## Duplicate and scratch paths

The path below exists and should be treated as an unverified duplicate or scratch candidate until a maintainer reviews it:

```text
C:\ai-lab\projects\tools\health-tracker
```

It was not treated as canonical in this cleanup pass.

## Generated folders are not reviewable work

Local generated folders and runtime state should not be committed as product work. Keep these out of review:

- `node_modules/`
- `.next/`
- `out/`
- `dist/`
- `build/`
- `coverage/`
- `.turbo/`
- `.cache/`
- `.venv/`
- `__pycache__/`
- `.pytest_cache/`
- `.operator/`
- `.codexforge/`
- `.checkpoints/`
- `_codexforge-backups/`
- `unpushed-patches/`
- local bundle files
- generated map dumps such as `all-files.txt`, `repo-index.txt`, and `src-tree.txt`

## Build

Run from the canonical frontend path:

```powershell
npm run build
```

## Smoke

Checkpoint docs smoke:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
```

Focused CodexForge smoke:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
```

Managed suite with a local dev server:

```powershell
npm run smoke:codexforge:server
```

## Clean tree check

Use:

```powershell
git status --short
git diff --check
git diff --stat
```

Expected reviewable work is source, docs, package metadata, smoke scripts, and intentional app routes. Generated folders, secrets, local workspace identity files, and runtime state are not reviewable work.

## What not to commit

Do not commit local env files, API keys, provider tokens, runtime checkpoints, generated build output, dependency folders, temporary repo maps, local backups, patch bundles, or unverified duplicate workspace files.
