param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3265 First Live Image Provider Idempotency Key Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-idempotency-key-wiring.ps1' `
  -Route 'first-live-image-provider-idempotency-key-wiring' `
  -CommandLabel 'Go to First Live Image Provider Idempotency Key Wiring' `
  -RouteHref '/first-live-image-provider-idempotency-key-wiring' `
  -Phase 'Phase 3265' `
  -Title 'First Live Image Provider Idempotency Key Wiring'
