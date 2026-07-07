param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3839 Jarvis Video Approval Packet Workspace Result Placeholder Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-result-placeholder-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-result-placeholder-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Result Placeholder Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-result-placeholder-wiring' `
  -Phase 'Phase 3839' `
  -Title 'Jarvis Video Approval Packet Workspace Result Placeholder Wiring'
