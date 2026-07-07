param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3836 Jarvis Video Approval Packet Workspace Cost Rate Timeout Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-cost-rate-timeout-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-cost-rate-timeout-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Cost Rate Timeout Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-cost-rate-timeout-wiring' `
  -Phase 'Phase 3836' `
  -Title 'Jarvis Video Approval Packet Workspace Cost Rate Timeout Wiring'
