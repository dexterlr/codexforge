param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3493 Video Provider Dry Run Retry Policy Preview Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-retry-policy-preview-wiring.ps1' -Route 'video-provider-dry-run-retry-policy-preview-wiring' -CommandLabel 'Go to Video Provider Dry Run Retry Policy Preview Wiring' -RouteHref '/video-provider-dry-run-retry-policy-preview-wiring' -Phase '3493' -Title 'Video Provider Dry Run Retry Policy Preview Wiring'
