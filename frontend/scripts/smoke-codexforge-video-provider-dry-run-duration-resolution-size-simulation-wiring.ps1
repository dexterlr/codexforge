param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3479 Video Provider Dry Run Duration Resolution Size Simulation Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-duration-resolution-size-simulation-wiring.ps1' -Route 'video-provider-dry-run-duration-resolution-size-simulation-wiring' -CommandLabel 'Go to Video Provider Dry Run Duration Resolution Size Simulation Wiring' -RouteHref '/video-provider-dry-run-duration-resolution-size-simulation-wiring' -Phase '3479' -Title 'Video Provider Dry Run Duration Resolution Size Simulation Wiring'
