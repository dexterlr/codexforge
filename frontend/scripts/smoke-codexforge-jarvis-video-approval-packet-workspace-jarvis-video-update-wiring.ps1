param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3847 Jarvis Video Approval Packet Workspace Jarvis Video Update Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-jarvis-video-update-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-jarvis-video-update-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Jarvis Video Update Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-jarvis-video-update-wiring' `
  -Phase 'Phase 3847' `
  -Title 'Jarvis Video Approval Packet Workspace Jarvis Video Update Wiring'
