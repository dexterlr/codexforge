param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3506 Video Provider Approval Packet Guard Snapshot Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-guard-snapshot-review-wiring.ps1' -Route 'video-provider-approval-packet-guard-snapshot-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Guard Snapshot Review Wiring' -RouteHref '/video-provider-approval-packet-guard-snapshot-review-wiring' -Phase '3506' -Title 'Video Provider Approval Packet Guard Snapshot Review Wiring'