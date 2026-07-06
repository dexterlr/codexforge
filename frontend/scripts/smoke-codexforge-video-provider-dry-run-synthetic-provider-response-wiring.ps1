param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3485 Video Provider Dry Run Synthetic Provider Response Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-synthetic-provider-response-wiring.ps1' -Route 'video-provider-dry-run-synthetic-provider-response-wiring' -CommandLabel 'Go to Video Provider Dry Run Synthetic Provider Response Wiring' -RouteHref '/video-provider-dry-run-synthetic-provider-response-wiring' -Phase '3485' -Title 'Video Provider Dry Run Synthetic Provider Response Wiring'
