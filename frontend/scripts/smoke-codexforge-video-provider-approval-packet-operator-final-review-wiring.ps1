param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3528 Video Provider Approval Packet Operator Final Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-operator-final-review-wiring.ps1' -Route 'video-provider-approval-packet-operator-final-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Operator Final Review Wiring' -RouteHref '/video-provider-approval-packet-operator-final-review-wiring' -Phase '3528' -Title 'Video Provider Approval Packet Operator Final Review Wiring'