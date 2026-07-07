param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3827 Jarvis Video Approval Packet Workspace Human Approval Gate Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-human-approval-gate-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-human-approval-gate-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Human Approval Gate Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-human-approval-gate-wiring' `
  -Phase 'Phase 3827' `
  -Title 'Jarvis Video Approval Packet Workspace Human Approval Gate Wiring'
