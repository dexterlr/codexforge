param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3467 Video Provider Dry Run Intent Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-intent-wiring.ps1' -Route 'video-provider-dry-run-intent-wiring' -CommandLabel 'Go to Video Provider Dry Run Intent Wiring' -RouteHref '/video-provider-dry-run-intent-wiring' -Phase '3467' -Title 'Video Provider Dry Run Intent Wiring'
