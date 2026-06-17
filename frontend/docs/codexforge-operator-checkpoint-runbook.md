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

Update checkpoint docs to the actual highest detected phase. If phases 666-681 are present and no higher phase exists, document the checkpoint as through phase 681 and describe the execution adapter contract review layer: execution adapter contract inventory, file write adapter contract review, command runner adapter contract review, local runtime adapter contract review, provider/model adapter contract review, connector adapter contract review, automation adapter contract review, evidence store adapter contract review, result store adapter contract review, recovery adapter contract review, packaging adapter contract review, creative adapter contract review, research adapter contract review, chatbot adapter contract review, game server adapter contract review, and universal execution adapter MVP candidate. Keep the package review-only, approval-required, not implemented yet, and not executable from UI until approved adapter implementations and evidence exist.

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
