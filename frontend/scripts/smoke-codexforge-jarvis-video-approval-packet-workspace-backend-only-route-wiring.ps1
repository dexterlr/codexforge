param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3828 Jarvis Video Approval Packet Workspace Backend Only Route Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-backend-only-route-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-backend-only-route-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Backend Only Route Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-backend-only-route-wiring' `
  -Phase 'Phase 3828' `
  -Title 'Jarvis Video Approval Packet Workspace Backend Only Route Wiring'
