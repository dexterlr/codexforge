param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3469 Video Provider Dry Run Id Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-id-wiring.ps1' -Route 'video-provider-dry-run-id-wiring' -CommandLabel 'Go to Video Provider Dry Run Id Wiring' -RouteHref '/video-provider-dry-run-id-wiring' -Phase '3469' -Title 'Video Provider Dry Run Id Wiring'
