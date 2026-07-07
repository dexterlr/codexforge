param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3830 Jarvis Video Approval Packet Workspace Credential Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-credential-token-reference-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-credential-token-reference-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Credential Token Reference Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-credential-token-reference-wiring' `
  -Phase 'Phase 3830' `
  -Title 'Jarvis Video Approval Packet Workspace Credential Token Reference Wiring'
