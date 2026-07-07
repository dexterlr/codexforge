param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3841 Jarvis Video Approval Packet Workspace Audit Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-audit-preview-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-audit-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Audit Preview Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-audit-preview-wiring' `
  -Phase 'Phase 3841' `
  -Title 'Jarvis Video Approval Packet Workspace Audit Preview Wiring'
