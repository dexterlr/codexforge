param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3477 Video Provider Dry Run Rate Limit Simulation Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-rate-limit-simulation-wiring.ps1' -Route 'video-provider-dry-run-rate-limit-simulation-wiring' -CommandLabel 'Go to Video Provider Dry Run Rate Limit Simulation Wiring' -RouteHref '/video-provider-dry-run-rate-limit-simulation-wiring' -Phase '3477' -Title 'Video Provider Dry Run Rate Limit Simulation Wiring'
