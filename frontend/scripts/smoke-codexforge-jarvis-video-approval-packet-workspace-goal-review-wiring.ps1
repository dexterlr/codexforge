param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3820 Jarvis Video Approval Packet Workspace Goal Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-goal-review-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-goal-review-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Goal Review Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-goal-review-wiring' `
  -Phase 'Phase 3820' `
  -Title 'Jarvis Video Approval Packet Workspace Goal Review Wiring'
