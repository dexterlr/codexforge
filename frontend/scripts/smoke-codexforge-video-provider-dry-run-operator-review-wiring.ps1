param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3496 Video Provider Dry Run Operator Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-operator-review-wiring.ps1' -Route 'video-provider-dry-run-operator-review-wiring' -CommandLabel 'Go to Video Provider Dry Run Operator Review Wiring' -RouteHref '/video-provider-dry-run-operator-review-wiring' -Phase '3496' -Title 'Video Provider Dry Run Operator Review Wiring'
