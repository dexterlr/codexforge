param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3331 First Live Video Provider Idempotency Key Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-idempotency-key-wiring.ps1' `
  -Route 'first-live-video-provider-idempotency-key-wiring' `
  -CommandLabel 'Go to First Live Video Provider Idempotency Key Wiring' `
  -RouteHref '/first-live-video-provider-idempotency-key-wiring' `
  -Phase 'Phase 3331' `
  -Title 'First Live Video Provider Idempotency Key Wiring'
