param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3823 Jarvis Video Approval Packet Workspace Dry Run Reference Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-dry-run-reference-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-dry-run-reference-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Dry Run Reference Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-dry-run-reference-wiring' `
  -Phase 'Phase 3823' `
  -Title 'Jarvis Video Approval Packet Workspace Dry Run Reference Wiring'
