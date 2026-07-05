param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3268 First Live Image Provider Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-fallback-policy-wiring.ps1' `
  -Route 'first-live-image-provider-fallback-policy-wiring' `
  -CommandLabel 'Go to First Live Image Provider Fallback Policy Wiring' `
  -RouteHref '/first-live-image-provider-fallback-policy-wiring' `
  -Phase 'Phase 3268' `
  -Title 'First Live Image Provider Fallback Policy Wiring'
