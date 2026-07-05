param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3267 First Live Image Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-retry-policy-wiring.ps1' `
  -Route 'first-live-image-provider-retry-policy-wiring' `
  -CommandLabel 'Go to First Live Image Provider Retry Policy Wiring' `
  -RouteHref '/first-live-image-provider-retry-policy-wiring' `
  -Phase 'Phase 3267' `
  -Title 'First Live Image Provider Retry Policy Wiring'
