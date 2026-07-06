param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3492 Video Provider Dry Run Replay Block Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-replay-block-wiring.ps1' -Route 'video-provider-dry-run-replay-block-wiring' -CommandLabel 'Go to Video Provider Dry Run Replay Block Wiring' -RouteHref '/video-provider-dry-run-replay-block-wiring' -Phase '3492' -Title 'Video Provider Dry Run Replay Block Wiring'
