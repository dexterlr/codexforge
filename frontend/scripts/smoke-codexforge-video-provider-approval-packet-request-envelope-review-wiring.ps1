param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3504 Video Provider Approval Packet Request Envelope Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-request-envelope-review-wiring.ps1' -Route 'video-provider-approval-packet-request-envelope-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Request Envelope Review Wiring' -RouteHref '/video-provider-approval-packet-request-envelope-review-wiring' -Phase '3504' -Title 'Video Provider Approval Packet Request Envelope Review Wiring'