param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-approval-packet-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke -SmokeName 'Phase 3505 Video Provider Approval Packet Prompt Redaction Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-approval-packet-prompt-redaction-review-wiring.ps1' -Route 'video-provider-approval-packet-prompt-redaction-review-wiring' -CommandLabel 'Go to Video Provider Approval Packet Prompt Redaction Review Wiring' -RouteHref '/video-provider-approval-packet-prompt-redaction-review-wiring' -Phase '3505' -Title 'Video Provider Approval Packet Prompt Redaction Review Wiring'