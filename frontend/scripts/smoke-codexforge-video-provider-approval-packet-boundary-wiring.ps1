param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3498 Video Provider Approval Packet Boundary Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-boundary-wiring.ps1' -Route 'video-provider-approval-packet-boundary-wiring' -CommandLabel 'Go to Video Provider Approval Packet Boundary Wiring' -RouteHref '/video-provider-approval-packet-boundary-wiring' -Phase '3498' -Title 'Video Provider Approval Packet Boundary Wiring'