param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3824 Jarvis Video Approval Packet Workspace Approval Id Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-approval-id-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-approval-id-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Approval Id Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-approval-id-wiring' `
  -Phase 'Phase 3824' `
  -Title 'Jarvis Video Approval Packet Workspace Approval Id Wiring'
