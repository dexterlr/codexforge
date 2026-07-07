param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3832 Jarvis Video Approval Packet Workspace Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-request-envelope-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-request-envelope-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Request Envelope Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-request-envelope-wiring' `
  -Phase 'Phase 3832' `
  -Title 'Jarvis Video Approval Packet Workspace Request Envelope Wiring'
