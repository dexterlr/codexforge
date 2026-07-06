param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3487 Video Provider Dry Run Result Capture Readiness Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-result-capture-readiness-wiring.ps1' -Route 'video-provider-dry-run-result-capture-readiness-wiring' -CommandLabel 'Go to Video Provider Dry Run Result Capture Readiness Wiring' -RouteHref '/video-provider-dry-run-result-capture-readiness-wiring' -Phase '3487' -Title 'Video Provider Dry Run Result Capture Readiness Wiring'
