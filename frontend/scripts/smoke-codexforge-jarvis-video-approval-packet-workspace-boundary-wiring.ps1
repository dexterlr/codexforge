param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3818 Jarvis Video Approval Packet Workspace Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-boundary-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-boundary-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Boundary Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-boundary-wiring' `
  -Phase 'Phase 3818' `
  -Title 'Jarvis Video Approval Packet Workspace Boundary Wiring'
