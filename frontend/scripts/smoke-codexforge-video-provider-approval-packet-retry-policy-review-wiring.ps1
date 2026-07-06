param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3524 Video Provider Approval Packet Retry Policy Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-retry-policy-review-wiring.ps1' -Route 'video-provider-approval-packet-retry-policy-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Retry Policy Review Wiring' -RouteHref '/video-provider-approval-packet-retry-policy-review-wiring' -Phase '3524' -Title 'Video Provider Approval Packet Retry Policy Review Wiring'