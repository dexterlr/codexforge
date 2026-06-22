param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1316 Backend Approval Operator Signoff" `
  -ScriptFile "smoke-codexforge-backend-approval-operator-signoff.ps1" `
  -Domain "src\lib\codexforge\backend-approval-operator-signoff" `
  -Route "src\app\backend-approval-operator-signoff" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Approval Operator Signoff" `
  -RouteHref "/backend-approval-operator-signoff" `
  -Markers @("Backend approval operator signoff", "Backend approval operator signoff does not persist signoff or approve execution", "Backend approval operator signoff requires explicit human approval", "Operator signoff confirms approval ticket file write handoff command handoff evidence result recovery audit queue and denied path matrix", "Denied backend approval signoff paths remain blocked", "Backend approval operator signoff checklist")
