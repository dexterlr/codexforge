param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3501 Video Provider Approval Packet Provider Ref Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-provider-ref-wiring.ps1' -Route 'video-provider-approval-packet-provider-ref-wiring' -CommandLabel 'Go to Video Provider Approval Packet Provider Ref Wiring' -RouteHref '/video-provider-approval-packet-provider-ref-wiring' -Phase '3501' -Title 'Video Provider Approval Packet Provider Ref Wiring'