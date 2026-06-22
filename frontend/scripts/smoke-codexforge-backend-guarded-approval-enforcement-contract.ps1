param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1328 Backend Guarded Approval Enforcement Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-approval-enforcement-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-approval-enforcement-contract" `
  -Route "src\app\backend-guarded-approval-enforcement-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Approval Enforcement Contract" `
  -RouteHref "/backend-guarded-approval-enforcement-contract" `
  -Markers @("Backend guarded approval enforcement contract", "Backend guarded approval enforcement contract does not persist approvals or release execution", "Backend guarded approval enforcement requires explicit human approval", "Approval enforcement contract defines operator identity approval scope expiry denied paths replay protection and backend authorization checks", "Denied backend guarded approval enforcement paths remain blocked", "Backend guarded approval enforcement checklist")
