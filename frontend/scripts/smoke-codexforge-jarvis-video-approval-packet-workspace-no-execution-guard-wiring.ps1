param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3848 Jarvis Video Approval Packet Workspace No Execution Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-no-execution-guard-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-no-execution-guard-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace No Execution Guard Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-no-execution-guard-wiring' `
  -Phase 'Phase 3848' `
  -Title 'Jarvis Video Approval Packet Workspace No Execution Guard Wiring'
