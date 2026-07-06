param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3482 Video Provider Dry Run Lineage Packet Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-lineage-packet-wiring.ps1' -Route 'video-provider-dry-run-lineage-packet-wiring' -CommandLabel 'Go to Video Provider Dry Run Lineage Packet Wiring' -RouteHref '/video-provider-dry-run-lineage-packet-wiring' -Phase '3482' -Title 'Video Provider Dry Run Lineage Packet Wiring'
