param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3829 Jarvis Video Approval Packet Workspace Provider Reference Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-provider-reference-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-provider-reference-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Provider Reference Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-provider-reference-wiring' `
  -Phase 'Phase 3829' `
  -Title 'Jarvis Video Approval Packet Workspace Provider Reference Wiring'
