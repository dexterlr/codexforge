param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3516 Video Provider Approval Packet Synthetic Response Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-synthetic-response-review-wiring.ps1' -Route 'video-provider-approval-packet-synthetic-response-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Synthetic Response Review Wiring' -RouteHref '/video-provider-approval-packet-synthetic-response-review-wiring' -Phase '3516' -Title 'Video Provider Approval Packet Synthetic Response Review Wiring'