param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1333 Backend Guarded Queue State Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-queue-state-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-queue-state-contract" `
  -Route "src\app\backend-guarded-queue-state-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Queue State Contract" `
  -RouteHref "/backend-guarded-queue-state-contract" `
  -Markers @("Backend guarded queue state contract", "Backend guarded queue state contract does not create queue jobs", "Backend guarded queue state requires explicit operator approval", "Queue state contract defines preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states", "Denied backend guarded queue state paths remain blocked", "Backend guarded queue state checklist")
