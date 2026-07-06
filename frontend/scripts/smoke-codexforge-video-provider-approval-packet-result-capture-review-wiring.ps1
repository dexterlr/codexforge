param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3518 Video Provider Approval Packet Result Capture Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-result-capture-review-wiring.ps1' -Route 'video-provider-approval-packet-result-capture-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Result Capture Review Wiring' -RouteHref '/video-provider-approval-packet-result-capture-review-wiring' -Phase '3518' -Title 'Video Provider Approval Packet Result Capture Review Wiring'