param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1324 Backend Guarded Run Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-run-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-run-contract" `
  -Route "src\app\backend-guarded-run-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Run Contract" `
  -RouteHref "/backend-guarded-run-contract" `
  -Markers @("Backend guarded run contract", "Backend guarded run contract does not run commands", "Backend guarded run requires explicit operator approval", "Run contract defines command allowlist arguments working directory environment names evidence result audit queue and recovery requirements", "Denied backend guarded run paths remain blocked", "Backend guarded run checklist")
