param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1321 Controlled Backend Approval Handoff Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-backend-approval-handoff-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-backend-approval-handoff-release-candidate" `
  -Route "src\app\controlled-backend-approval-handoff-release-candidate" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Controlled Backend Approval Handoff Release Candidate" `
  -RouteHref "/controlled-backend-approval-handoff-release-candidate" `
  -Markers @("Controlled backend approval handoff release candidate", "Controlled backend approval handoff release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery", "Controlled backend approval handoff release requires explicit operator approval", "Release candidate prepares CodexForge for future backend-owned approval and execution without executing it", "Denied controlled backend approval handoff paths remain blocked", "Controlled backend approval handoff release checklist")
