param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3499 Video Provider Approval Packet Intent Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-intent-wiring.ps1' -Route 'video-provider-approval-packet-intent-wiring' -CommandLabel 'Go to Video Provider Approval Packet Intent Wiring' -RouteHref '/video-provider-approval-packet-intent-wiring' -Phase '3499' -Title 'Video Provider Approval Packet Intent Wiring'