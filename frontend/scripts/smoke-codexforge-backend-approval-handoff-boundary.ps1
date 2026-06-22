param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1306 Backend Approval Handoff Boundary" `
  -ScriptFile "smoke-codexforge-backend-approval-handoff-boundary.ps1" `
  -Domain "src\lib\codexforge\backend-approval-handoff-boundary" `
  -Route "src\app\backend-approval-handoff-boundary" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Approval Handoff Boundary" `
  -RouteHref "/backend-approval-handoff-boundary" `
  -Markers @("Backend approval handoff boundary", "Backend approval handoff boundary does not execute backend actions", "Backend approval handoff requires explicit operator approval", "Handoff boundary separates frontend preview from backend-owned approval and execution", "Denied backend approval handoff paths remain blocked", "Backend approval handoff checklist")
