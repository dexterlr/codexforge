param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3478 Video Provider Dry Run Timeout Simulation Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-timeout-simulation-wiring.ps1' -Route 'video-provider-dry-run-timeout-simulation-wiring' -CommandLabel 'Go to Video Provider Dry Run Timeout Simulation Wiring' -RouteHref '/video-provider-dry-run-timeout-simulation-wiring' -Phase '3478' -Title 'Video Provider Dry Run Timeout Simulation Wiring'
