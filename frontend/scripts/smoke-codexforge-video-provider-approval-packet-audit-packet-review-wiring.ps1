param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3514 Video Provider Approval Packet Audit Packet Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-audit-packet-review-wiring.ps1' -Route 'video-provider-approval-packet-audit-packet-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Audit Packet Review Wiring' -RouteHref '/video-provider-approval-packet-audit-packet-review-wiring' -Phase '3514' -Title 'Video Provider Approval Packet Audit Packet Review Wiring'