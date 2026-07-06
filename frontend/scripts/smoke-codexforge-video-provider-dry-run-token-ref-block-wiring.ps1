param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3472 Video Provider Dry Run Token Ref Block Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-token-ref-block-wiring.ps1' -Route 'video-provider-dry-run-token-ref-block-wiring' -CommandLabel 'Go to Video Provider Dry Run Token Ref Block Wiring' -RouteHref '/video-provider-dry-run-token-ref-block-wiring' -Phase '3472' -Title 'Video Provider Dry Run Token Ref Block Wiring'
