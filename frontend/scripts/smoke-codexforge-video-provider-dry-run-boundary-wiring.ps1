param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3466 Video Provider Dry Run Boundary Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-boundary-wiring.ps1' -Route 'video-provider-dry-run-boundary-wiring' -CommandLabel 'Go to Video Provider Dry Run Boundary Wiring' -RouteHref '/video-provider-dry-run-boundary-wiring' -Phase '3466' -Title 'Video Provider Dry Run Boundary Wiring'
