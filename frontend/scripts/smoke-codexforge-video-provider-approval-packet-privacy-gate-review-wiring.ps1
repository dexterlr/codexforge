param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3511 Video Provider Approval Packet Privacy Gate Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-privacy-gate-review-wiring.ps1' -Route 'video-provider-approval-packet-privacy-gate-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Privacy Gate Review Wiring' -RouteHref '/video-provider-approval-packet-privacy-gate-review-wiring' -Phase '3511' -Title 'Video Provider Approval Packet Privacy Gate Review Wiring'