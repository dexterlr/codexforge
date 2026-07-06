param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3473 Video Provider Dry Run Request Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-request-envelope-wiring.ps1' -Route 'video-provider-dry-run-request-envelope-wiring' -CommandLabel 'Go to Video Provider Dry Run Request Envelope Wiring' -RouteHref '/video-provider-dry-run-request-envelope-wiring' -Phase '3473' -Title 'Video Provider Dry Run Request Envelope Wiring'
