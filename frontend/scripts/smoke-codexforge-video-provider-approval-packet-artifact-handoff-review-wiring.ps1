param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3519 Video Provider Approval Packet Artifact Handoff Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-artifact-handoff-review-wiring.ps1' -Route 'video-provider-approval-packet-artifact-handoff-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Artifact Handoff Review Wiring' -RouteHref '/video-provider-approval-packet-artifact-handoff-review-wiring' -Phase '3519' -Title 'Video Provider Approval Packet Artifact Handoff Review Wiring'