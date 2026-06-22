param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1307 Backend Approval Ticket Contract" `
  -ScriptFile "smoke-codexforge-backend-approval-ticket-contract.ps1" `
  -Domain "src\lib\codexforge\backend-approval-ticket-contract" `
  -Route "src\app\backend-approval-ticket-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Approval Ticket Contract" `
  -RouteHref "/backend-approval-ticket-contract" `
  -Markers @("Backend approval ticket contract", "Backend approval ticket contract does not persist approvals", "Backend approval ticket requires explicit human approval", "Approval ticket contract defines approval scope operator identity target action denied paths and expiry", "Denied backend approval ticket paths remain blocked", "Backend approval ticket checklist")
