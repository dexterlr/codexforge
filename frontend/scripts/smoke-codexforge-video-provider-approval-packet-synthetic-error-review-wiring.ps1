param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3517 Video Provider Approval Packet Synthetic Error Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-synthetic-error-review-wiring.ps1' -Route 'video-provider-approval-packet-synthetic-error-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Synthetic Error Review Wiring' -RouteHref '/video-provider-approval-packet-synthetic-error-review-wiring' -Phase '3517' -Title 'Video Provider Approval Packet Synthetic Error Review Wiring'