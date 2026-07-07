param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3846 Jarvis Video Approval Packet Workspace Blocked Action Summary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-blocked-action-summary-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-blocked-action-summary-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Blocked Action Summary Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-blocked-action-summary-wiring' `
  -Phase 'Phase 3846' `
  -Title 'Jarvis Video Approval Packet Workspace Blocked Action Summary Wiring'
