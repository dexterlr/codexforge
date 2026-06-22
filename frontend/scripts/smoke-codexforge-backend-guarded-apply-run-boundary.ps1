param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1322 Backend Guarded Apply Run Boundary" `
  -ScriptFile "smoke-codexforge-backend-guarded-apply-run-boundary.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-apply-run-boundary" `
  -Route "src\app\backend-guarded-apply-run-boundary" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Apply Run Boundary" `
  -RouteHref "/backend-guarded-apply-run-boundary" `
  -Markers @("Backend guarded apply run boundary", "Backend guarded apply run boundary does not execute apply or run", "Backend guarded apply run requires explicit operator approval", "Apply run boundary separates frontend preview from backend-owned guarded apply and command run", "Denied backend guarded apply run paths remain blocked", "Backend guarded apply run checklist")
