param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3835 Jarvis Video Approval Packet Workspace Guard Snapshot Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-guard-snapshot-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-guard-snapshot-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Guard Snapshot Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-guard-snapshot-wiring' `
  -Phase 'Phase 3835' `
  -Title 'Jarvis Video Approval Packet Workspace Guard Snapshot Wiring'
