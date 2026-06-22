param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1352 First Guarded Apply Run Dry-Run Candidate" `
  -ScriptFile "smoke-codexforge-first-guarded-apply-run-dry-run-candidate.ps1" `
  -Domain "src\lib\codexforge\first-guarded-apply-run-dry-run-candidate" `
  -Route "src\app\first-guarded-apply-run-dry-run-candidate" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to First Guarded Apply Run Dry-Run Candidate" `
  -RouteHref "/first-guarded-apply-run-dry-run-candidate" `
  -Markers @("First guarded apply run dry-run candidate", "First guarded apply run dry-run candidate does not execute apply or run", "First guarded apply run dry-run candidate requires explicit operator approval", "Candidate combines apply packet run packet path guard command guard approval evidence result recovery audit queue denied paths and go no-go review", "Denied first guarded apply run dry-run paths remain blocked", "First guarded apply run dry-run checklist")
