param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1323 Backend Guarded Apply Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-apply-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-apply-contract" `
  -Route "src\app\backend-guarded-apply-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Apply Contract" `
  -RouteHref "/backend-guarded-apply-contract" `
  -Markers @("Backend guarded apply contract", "Backend guarded apply contract does not write files or apply diffs", "Backend guarded apply requires explicit operator approval", "Apply contract defines path guard diff rollback evidence result audit queue and recovery requirements", "Denied backend guarded apply paths remain blocked", "Backend guarded apply checklist")
