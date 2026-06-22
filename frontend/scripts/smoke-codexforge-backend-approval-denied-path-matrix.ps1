param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1315 Backend Approval Denied Path Matrix" `
  -ScriptFile "smoke-codexforge-backend-approval-denied-path-matrix.ps1" `
  -Domain "src\lib\codexforge\backend-approval-denied-path-matrix" `
  -Route "src\app\backend-approval-denied-path-matrix" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Approval Denied Path Matrix" `
  -RouteHref "/backend-approval-denied-path-matrix" `
  -Markers @("Backend approval denied path matrix", "Backend approval denied path matrix does not mutate workflow state", "Backend approval denied path matrix requires explicit operator approval", "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion", "Denied backend approval matrix paths remain blocked", "Backend approval denied path matrix checklist")
