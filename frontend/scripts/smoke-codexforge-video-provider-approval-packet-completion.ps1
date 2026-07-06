param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3529 Video Provider Approval Packet Completion' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-completion.ps1' -Route 'video-provider-approval-packet-completion' -CommandLabel 'Go to Video Provider Approval Packet Completion' -RouteHref '/video-provider-approval-packet-completion' -Phase '3529' -Title 'Video Provider Approval Packet Completion'