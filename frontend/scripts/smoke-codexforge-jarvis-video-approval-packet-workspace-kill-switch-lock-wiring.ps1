param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3844 Jarvis Video Approval Packet Workspace Kill Switch Lock Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-kill-switch-lock-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-kill-switch-lock-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Kill Switch Lock Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-kill-switch-lock-wiring' `
  -Phase 'Phase 3844' `
  -Title 'Jarvis Video Approval Packet Workspace Kill Switch Lock Wiring'
