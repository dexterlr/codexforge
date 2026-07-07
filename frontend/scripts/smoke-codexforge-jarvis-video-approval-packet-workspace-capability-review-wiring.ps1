param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3821 Jarvis Video Approval Packet Workspace Capability Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-capability-review-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-capability-review-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Capability Review Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-capability-review-wiring' `
  -Phase 'Phase 3821' `
  -Title 'Jarvis Video Approval Packet Workspace Capability Review Wiring'
