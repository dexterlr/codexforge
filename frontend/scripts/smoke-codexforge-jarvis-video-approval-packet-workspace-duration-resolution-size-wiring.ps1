param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3837 Jarvis Video Approval Packet Workspace Duration Resolution Size Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-duration-resolution-size-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-duration-resolution-size-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Duration Resolution Size Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-duration-resolution-size-wiring' `
  -Phase 'Phase 3837' `
  -Title 'Jarvis Video Approval Packet Workspace Duration Resolution Size Wiring'
