param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3515 Video Provider Approval Packet Observability Trace Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-observability-trace-review-wiring.ps1' -Route 'video-provider-approval-packet-observability-trace-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Observability Trace Review Wiring' -RouteHref '/video-provider-approval-packet-observability-trace-review-wiring' -Phase '3515' -Title 'Video Provider Approval Packet Observability Trace Review Wiring'