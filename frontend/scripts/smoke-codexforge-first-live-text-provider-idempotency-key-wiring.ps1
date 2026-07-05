param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3199 First Live Text Provider Idempotency Key Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-idempotency-key-wiring.ps1' `
  -Route 'first-live-text-provider-idempotency-key-wiring' `
  -CommandLabel 'Go to First Live Text Provider Idempotency Key Wiring' `
  -RouteHref '/first-live-text-provider-idempotency-key-wiring' `
  -Phase 'Phase 3199' `
  -Title 'First Live Text Provider Idempotency Key Wiring'