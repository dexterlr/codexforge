param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3509 Video Provider Approval Packet Timeout Cap Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-timeout-cap-review-wiring.ps1' -Route 'video-provider-approval-packet-timeout-cap-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Timeout Cap Review Wiring' -RouteHref '/video-provider-approval-packet-timeout-cap-review-wiring' -Phase '3509' -Title 'Video Provider Approval Packet Timeout Cap Review Wiring'