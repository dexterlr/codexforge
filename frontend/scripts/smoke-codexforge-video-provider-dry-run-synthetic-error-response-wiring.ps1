param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3486 Video Provider Dry Run Synthetic Error Response Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-synthetic-error-response-wiring.ps1' -Route 'video-provider-dry-run-synthetic-error-response-wiring' -CommandLabel 'Go to Video Provider Dry Run Synthetic Error Response Wiring' -RouteHref '/video-provider-dry-run-synthetic-error-response-wiring' -Phase '3486' -Title 'Video Provider Dry Run Synthetic Error Response Wiring'
