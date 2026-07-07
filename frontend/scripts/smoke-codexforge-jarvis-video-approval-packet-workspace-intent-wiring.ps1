param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3819 Jarvis Video Approval Packet Workspace Intent Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-intent-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-intent-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Intent Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-intent-wiring' `
  -Phase 'Phase 3819' `
  -Title 'Jarvis Video Approval Packet Workspace Intent Wiring'
