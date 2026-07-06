param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3522 Video Provider Approval Packet Idempotency Key Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-idempotency-key-review-wiring.ps1' -Route 'video-provider-approval-packet-idempotency-key-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Idempotency Key Review Wiring' -RouteHref '/video-provider-approval-packet-idempotency-key-review-wiring' -Phase '3522' -Title 'Video Provider Approval Packet Idempotency Key Review Wiring'