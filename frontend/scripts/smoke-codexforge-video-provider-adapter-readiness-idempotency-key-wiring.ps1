param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3555 Video Provider Adapter Readiness Idempotency Key Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-idempotency-key-wiring.ps1' -Route 'video-provider-adapter-readiness-idempotency-key-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Idempotency Key Wiring' -RouteHref '/video-provider-adapter-readiness-idempotency-key-wiring' -Phase '3555' -Title 'Video Provider Adapter Readiness Idempotency Key Wiring'