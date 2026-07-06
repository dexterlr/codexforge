param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3508 Video Provider Approval Packet Rate Cap Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-rate-cap-review-wiring.ps1' -Route 'video-provider-approval-packet-rate-cap-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Rate Cap Review Wiring' -RouteHref '/video-provider-approval-packet-rate-cap-review-wiring' -Phase '3508' -Title 'Video Provider Approval Packet Rate Cap Review Wiring'