param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1329 Backend Guarded Evidence Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-evidence-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-evidence-contract" `
  -Route "src\app\backend-guarded-evidence-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Evidence Contract" `
  -RouteHref "/backend-guarded-evidence-contract" `
  -Markers @("Backend guarded evidence contract", "Backend guarded evidence contract does not persist evidence", "Backend guarded evidence requires explicit operator approval", "Evidence contract defines diff command stdout stderr exit code approval timestamp redaction operator audit and queue references", "Denied backend guarded evidence paths remain blocked", "Backend guarded evidence checklist")
