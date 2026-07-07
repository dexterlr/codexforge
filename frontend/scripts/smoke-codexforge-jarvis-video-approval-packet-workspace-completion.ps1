param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3849 Jarvis Video Approval Packet Workspace Completion' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-completion.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-completion' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Completion' `
  -RouteHref '/jarvis-video-approval-packet-workspace-completion' `
  -Phase 'Phase 3849' `
  -Title 'Jarvis Video Approval Packet Workspace Completion'
