param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3491 Video Provider Dry Run Idempotency Key Preview Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-idempotency-key-preview-wiring.ps1' -Route 'video-provider-dry-run-idempotency-key-preview-wiring' -CommandLabel 'Go to Video Provider Dry Run Idempotency Key Preview Wiring' -RouteHref '/video-provider-dry-run-idempotency-key-preview-wiring' -Phase '3491' -Title 'Video Provider Dry Run Idempotency Key Preview Wiring'
