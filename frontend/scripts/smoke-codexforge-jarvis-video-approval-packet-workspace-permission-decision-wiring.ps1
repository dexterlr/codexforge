param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3825 Jarvis Video Approval Packet Workspace Permission Decision Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-permission-decision-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-permission-decision-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Permission Decision Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-permission-decision-wiring' `
  -Phase 'Phase 3825' `
  -Title 'Jarvis Video Approval Packet Workspace Permission Decision Wiring'
