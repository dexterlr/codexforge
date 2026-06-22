param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1330 Backend Guarded Result Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-result-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-result-contract" `
  -Route "src\app\backend-guarded-result-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Result Contract" `
  -RouteHref "/backend-guarded-result-contract" `
  -Markers @("Backend guarded result contract", "Backend guarded result contract does not persist results", "Backend guarded result requires explicit operator approval", "Result contract defines success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states", "Denied backend guarded result paths remain blocked", "Backend guarded result checklist")
