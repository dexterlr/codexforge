param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3826 Jarvis Video Approval Packet Workspace Approval Decision Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-approval-decision-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-approval-decision-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Approval Decision Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-approval-decision-wiring' `
  -Phase 'Phase 3826' `
  -Title 'Jarvis Video Approval Packet Workspace Approval Decision Wiring'
