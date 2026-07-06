param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3526 Video Provider Approval Packet Backend Runtime Check Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-backend-runtime-check-wiring.ps1' -Route 'video-provider-approval-packet-backend-runtime-check-wiring' -CommandLabel 'Go to Video Provider Approval Packet Backend Runtime Check Wiring' -RouteHref '/video-provider-approval-packet-backend-runtime-check-wiring' -Phase '3526' -Title 'Video Provider Approval Packet Backend Runtime Check Wiring'