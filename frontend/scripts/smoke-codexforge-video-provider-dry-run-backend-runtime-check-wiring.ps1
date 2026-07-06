param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3495 Video Provider Dry Run Backend Runtime Check Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-backend-runtime-check-wiring.ps1' -Route 'video-provider-dry-run-backend-runtime-check-wiring' -CommandLabel 'Go to Video Provider Dry Run Backend Runtime Check Wiring' -RouteHref '/video-provider-dry-run-backend-runtime-check-wiring' -Phase '3495' -Title 'Video Provider Dry Run Backend Runtime Check Wiring'
