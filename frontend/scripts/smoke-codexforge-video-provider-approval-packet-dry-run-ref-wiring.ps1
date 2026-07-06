param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3500 Video Provider Approval Packet Dry Run Ref Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-dry-run-ref-wiring.ps1' -Route 'video-provider-approval-packet-dry-run-ref-wiring' -CommandLabel 'Go to Video Provider Approval Packet Dry Run Ref Wiring' -RouteHref '/video-provider-approval-packet-dry-run-ref-wiring' -Phase '3500' -Title 'Video Provider Approval Packet Dry Run Ref Wiring'