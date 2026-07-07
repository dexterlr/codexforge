param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3845 Jarvis Video Approval Packet Workspace Idempotency Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-idempotency-replay-block-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-idempotency-replay-block-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Idempotency Replay Block Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-idempotency-replay-block-wiring' `
  -Phase 'Phase 3845' `
  -Title 'Jarvis Video Approval Packet Workspace Idempotency Replay Block Wiring'
