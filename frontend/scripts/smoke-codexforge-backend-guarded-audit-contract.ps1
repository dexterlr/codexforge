param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1332 Backend Guarded Audit Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-audit-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-audit-contract" `
  -Route "src\app\backend-guarded-audit-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Audit Contract" `
  -RouteHref "/backend-guarded-audit-contract" `
  -Markers @("Backend guarded audit contract", "Backend guarded audit contract does not persist audit logs", "Backend guarded audit requires explicit operator approval", "Audit contract defines goal plan diff apply command approval evidence result recovery queue operator and denied-path records", "Denied backend guarded audit paths remain blocked", "Backend guarded audit checklist")
