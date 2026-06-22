param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1336 First Backend Guarded Apply Run Candidate" `
  -ScriptFile "smoke-codexforge-first-backend-guarded-apply-run-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backend-guarded-apply-run-candidate" `
  -Route "src\app\first-backend-guarded-apply-run-candidate" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to First Backend Guarded Apply Run Candidate" `
  -RouteHref "/first-backend-guarded-apply-run-candidate" `
  -Markers @("First backend guarded apply run candidate", "First backend guarded apply run candidate does not execute apply or run", "First backend guarded apply run candidate requires explicit operator approval", "Candidate combines apply contract run contract path guard command guard approval evidence result recovery audit queue denied paths and go no-go review", "Denied first backend guarded apply run paths remain blocked", "First backend guarded apply run checklist")
