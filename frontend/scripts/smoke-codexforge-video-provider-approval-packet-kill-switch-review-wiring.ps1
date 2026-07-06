param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3520 Video Provider Approval Packet Kill Switch Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-kill-switch-review-wiring.ps1' -Route 'video-provider-approval-packet-kill-switch-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Kill Switch Review Wiring' -RouteHref '/video-provider-approval-packet-kill-switch-review-wiring' -Phase '3520' -Title 'Video Provider Approval Packet Kill Switch Review Wiring'