param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3298 First Live Audio Provider Idempotency Key Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-idempotency-key-wiring.ps1' `
  -Route 'first-live-audio-provider-idempotency-key-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Idempotency Key Wiring' `
  -RouteHref '/first-live-audio-provider-idempotency-key-wiring' `
  -Phase 'Phase 3298' `
  -Title 'First Live Audio Provider Idempotency Key Wiring'
