param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1331 Backend Guarded Recovery Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-recovery-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-recovery-contract" `
  -Route "src\app\backend-guarded-recovery-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Recovery Contract" `
  -RouteHref "/backend-guarded-recovery-contract" `
  -Markers @("Backend guarded recovery contract", "Backend guarded recovery contract does not execute recovery", "Backend guarded recovery requires explicit operator approval", "Recovery contract defines rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements", "Denied backend guarded recovery paths remain blocked", "Backend guarded recovery checklist")
