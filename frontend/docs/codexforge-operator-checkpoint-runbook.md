# CodexForge Operator Checkpoint Runbook

Canonical workspace:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

This runbook is for documentation and hygiene checkpoints. It does not approve live execution.

## Verify The Workspace

```powershell
Get-Location
git status --short
git diff --stat
git diff --check
```

Expected path: `C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend`.

Do not edit duplicate or scratch workspaces while preparing a CodexForge checkpoint.

## Run Build

```powershell
npm run build
```

Build output is local terminal evidence only. Do not claim CI passed unless actual CI or terminal logs prove it.

## Run All-Smoke

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
```

The all-smoke registry is the local source for the highest detected phase. It does not prove remote CI status.

## Run Focused Recent Smokes

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
npm run smoke:codexforge:server
```

Use focused smokes to catch documentation drift, command/navigation regressions, repo hygiene drift, and server-rendered route issues.

## Inspect All-Smoke For Latest Phase

```powershell
$allSmoke = Get-Content -Raw .\scripts\smoke-codexforge-all.ps1
$phases = [regex]::Matches($allSmoke, 'Phase\s+(\d+)') |
  ForEach-Object { [int]$_.Groups[1].Value }
$phases | Sort-Object -Descending | Select-Object -First 1
```

Update checkpoint docs to the actual highest detected phase. If phases 778-793 are present and no higher phase exists, document the checkpoint as through phase 793 and describe the real adapter wiring plan and broad controlled builder beta layer: real file write adapter wiring plan, real command runner adapter wiring plan, real local runtime adapter wiring plan, real evidence store wiring plan, real result store wiring plan, real recovery wiring plan, real packaging wiring plan, real project scaffold wiring plan, real adapter approval wiring plan, real adapter audit wiring plan, real adapter sandbox wiring plan, real adapter validation wiring plan, real adapter operator trial plan, first real adapter wiring candidate, first adapter execution beta review, and broad controlled builder beta candidate. Keep the package review-only, approval-required, wiring plan only, not executable from UI, and not adapter-executable until approved backend-owned bounded adapter implementations and evidence exist.

## Commit And Tag Checkpoint Docs

1. Confirm `git status --short` shows only intentional README, docs, and smoke script changes.
2. Run build, checkpoint docs smoke, all-smoke, focused smokes, server smoke, and diff hygiene checks.
3. Stage only the approved checkpoint files.
4. Commit after explicit operator approval.
5. Tag after explicit operator approval and after reviewing the final commit.

## Recover If Checkpoint Docs Smoke Fails

- Read the failing `[FAIL]` line first.
- If the highest detected phase changed, update the checkpoint docs to the actual all-smoke state.
- If safety wording is missing, add plain language for review-only surfaces, explicit operator approval, no silent mutation, no provider/local/connector/automation execution without approval, no credential/output storage, and no memory auto-promotion.
- If the smoke finds stale 230-series language, remove the obsolete roadmap text.
- If the smoke finds a false live execution or CI claim, replace it with bounded approval-language or proof-backed validation language.
- Re-run `powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1`.

## What Not To Edit

- Do not create product phase surfaces.
- Do not add runtime workflow routes for documentation-only checkpoints.
- Do not add dependencies or package install behavior.
- Do not edit ignored/generated folders such as `node_modules`, `.next`, `out`, `dist`, `build`, `coverage`, `.operator`, `.codexforge`, `.checkpoints`, `_codexforge-backups`, or `unpushed-patches`.
- Do not call providers, local models, connectors, automations, web, files, shell, git, or local bridge from UI.
- Do not mutate Brain or memory.
- Do not store credentials or live outputs in `localStorage` or `sessionStorage`.
- Do not claim live execution unless an approved local/backend/provider boundary exists.
