param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3521 Video Provider Approval Packet Single Call Lock Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-single-call-lock-review-wiring.ps1' -Route 'video-provider-approval-packet-single-call-lock-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Single Call Lock Review Wiring' -RouteHref '/video-provider-approval-packet-single-call-lock-review-wiring' -Phase '3521' -Title 'Video Provider Approval Packet Single Call Lock Review Wiring'