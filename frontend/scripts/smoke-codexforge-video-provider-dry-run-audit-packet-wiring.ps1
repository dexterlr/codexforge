param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3483 Video Provider Dry Run Audit Packet Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-audit-packet-wiring.ps1' -Route 'video-provider-dry-run-audit-packet-wiring' -CommandLabel 'Go to Video Provider Dry Run Audit Packet Wiring' -RouteHref '/video-provider-dry-run-audit-packet-wiring' -Phase '3483' -Title 'Video Provider Dry Run Audit Packet Wiring'
