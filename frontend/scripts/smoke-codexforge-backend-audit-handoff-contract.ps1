param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1313 Backend Audit Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-audit-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-audit-handoff-contract" `
  -Route "src\app\backend-audit-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Audit Handoff Contract" `
  -RouteHref "/backend-audit-handoff-contract" `
  -Markers @("Backend audit handoff contract", "Backend audit handoff contract does not persist audit logs", "Backend audit handoff requires explicit operator approval", "Audit handoff contract defines goal context approval file command evidence result recovery queue and operator signoff records", "Denied backend audit handoff paths remain blocked", "Backend audit handoff checklist")
