param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3523 Video Provider Approval Packet Replay Block Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-replay-block-review-wiring.ps1' -Route 'video-provider-approval-packet-replay-block-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Replay Block Review Wiring' -RouteHref '/video-provider-approval-packet-replay-block-review-wiring' -Phase '3523' -Title 'Video Provider Approval Packet Replay Block Review Wiring'