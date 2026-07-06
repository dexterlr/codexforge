param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3457 Video Provider Runtime Idempotency Key Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-idempotency-key-wiring.ps1' -Route 'video-provider-runtime-idempotency-key-wiring' -CommandLabel 'Go to Video Provider Runtime Idempotency Key Wiring' -RouteHref '/video-provider-runtime-idempotency-key-wiring' -Phase '3457' -Title 'Video Provider Runtime Idempotency Key Wiring'

