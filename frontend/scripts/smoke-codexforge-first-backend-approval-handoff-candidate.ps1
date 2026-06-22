param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1320 First Backend Approval Handoff Candidate" `
  -ScriptFile "smoke-codexforge-first-backend-approval-handoff-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backend-approval-handoff-candidate" `
  -Route "src\app\first-backend-approval-handoff-candidate" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to First Backend Approval Handoff Candidate" `
  -RouteHref "/first-backend-approval-handoff-candidate" `
  -Markers @("First backend approval handoff candidate", "First backend approval handoff candidate does not execute backend actions", "First backend approval handoff candidate requires explicit operator approval", "Candidate combines approval ticket file write command evidence result recovery audit queue denied path signoff go no-go security and failure reviews", "Denied first backend approval handoff paths remain blocked", "First backend approval handoff checklist")
