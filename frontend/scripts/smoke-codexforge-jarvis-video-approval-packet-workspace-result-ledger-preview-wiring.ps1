param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3842 Jarvis Video Approval Packet Workspace Result Ledger Preview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-result-ledger-preview-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-result-ledger-preview-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Result Ledger Preview Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-result-ledger-preview-wiring' `
  -Phase 'Phase 3842' `
  -Title 'Jarvis Video Approval Packet Workspace Result Ledger Preview Wiring'
