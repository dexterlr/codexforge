param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3254 First Live Image Provider Timeout Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-timeout-cap-wiring.ps1' `
  -Route 'first-live-image-provider-timeout-cap-wiring' `
  -CommandLabel 'Go to First Live Image Provider Timeout Cap Wiring' `
  -RouteHref '/first-live-image-provider-timeout-cap-wiring' `
  -Phase 'Phase 3254' `
  -Title 'First Live Image Provider Timeout Cap Wiring'
