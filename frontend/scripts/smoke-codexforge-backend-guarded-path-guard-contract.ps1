param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1326 Backend Guarded Path Guard Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-path-guard-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-path-guard-contract" `
  -Route "src\app\backend-guarded-path-guard-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Path Guard Contract" `
  -RouteHref "/backend-guarded-path-guard-contract" `
  -Markers @("Backend guarded path guard contract", "Backend guarded path guard contract does not browse arbitrary files or write files", "Backend guarded path guard requires explicit operator approval", "Path guard contract defines workspace root containment traversal denial generated file policy binary guard and rollback requirements", "Denied backend guarded path guard paths remain blocked", "Backend guarded path guard checklist")
