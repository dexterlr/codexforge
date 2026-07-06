param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3525 Video Provider Approval Packet Fallback Policy Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-fallback-policy-review-wiring.ps1' -Route 'video-provider-approval-packet-fallback-policy-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Fallback Policy Review Wiring' -RouteHref '/video-provider-approval-packet-fallback-policy-review-wiring' -Phase '3525' -Title 'Video Provider Approval Packet Fallback Policy Review Wiring'