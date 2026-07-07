param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3838 Jarvis Video Approval Packet Workspace Privacy Safety Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-privacy-safety-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-privacy-safety-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Privacy Safety Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-privacy-safety-wiring' `
  -Phase 'Phase 3838' `
  -Title 'Jarvis Video Approval Packet Workspace Privacy Safety Wiring'
