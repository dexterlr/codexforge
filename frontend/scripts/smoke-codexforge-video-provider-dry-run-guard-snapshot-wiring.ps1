param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3475 Video Provider Dry Run Guard Snapshot Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-guard-snapshot-wiring.ps1' -Route 'video-provider-dry-run-guard-snapshot-wiring' -CommandLabel 'Go to Video Provider Dry Run Guard Snapshot Wiring' -RouteHref '/video-provider-dry-run-guard-snapshot-wiring' -Phase '3475' -Title 'Video Provider Dry Run Guard Snapshot Wiring'
