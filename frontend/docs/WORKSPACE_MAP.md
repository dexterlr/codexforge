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

All-smoke registry:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
```

Focused CodexForge smoke:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
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


CodexForge is checkpointed through detected phase 2601 in the local all-smoke registry. The latest completed batch is 2570-2601 - Provider Result Review + Recovery Mega Batch v1. Latest release candidate: Provider Result Review Recovery Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, Provider Gateway Wiring readiness section, Provider Backend Adapter Contract section, Provider Adapter Dry Run Harness section, Provider Mock Result Harness section, Provider Approval Audit Enforcement section, Controlled Provider Dry Run Candidate section, Provider Backend Execution Readiness section, First Real Provider Call Guard section, First Approved Provider Trial section, and now adds the Provider Result Review + Recovery section covering result review envelope: synthetic only, safety review: required, privacy review: required, redaction review: required, audit join: required, approval join: required, rejection workflow: review-only, recovery plan: review-only, promotion lane: disabled, persistence/export/publish: blocked, and next batch 2602-2633 - Provider Gateway Hardening Mega Batch v1. No live provider execution exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. No frontend persistence. No browser storage writes. No connector calls. No upload. No download. No render. No export. No publish. No schedule. No queue dispatch. No worker dispatch. No database writes. No command execution. No service creation. No API creation from frontend. No approval persistence from frontend. No audit persistence from frontend. No result persistence from frontend. The dry run harness remains synthetic and review-only. Provider dry run remains backend-owned. The mock result harness remains synthetic and review-only. Provider mock result handling remains backend-owned. Approval audit enforcement remains synthetic and review-only. Provider approval audit handling remains backend-owned. The controlled provider dry run candidate remains synthetic and review-only. Provider backend execution readiness remains synthetic and review-only. First real provider call guard remains synthetic and review-only. First approved provider trial remains synthetic and review-only. Provider result review recovery remains synthetic and review-only. Review-only provider result review recovery. Synthetic provider result review data only. Real provider call remains backend-owned and blocked. Approved provider trial remains backend-owned and blocked. Provider result promotion remains backend-owned and blocked. Backend execution remains backend-owned. Backend-owned provider adapter remains required. Explicit operator approval required. Audit trail required. Next likely batch: 2602-2633 - Provider Gateway Hardening Mega Batch v1.
