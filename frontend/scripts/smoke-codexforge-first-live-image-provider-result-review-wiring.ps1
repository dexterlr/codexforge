param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3261 First Live Image Provider Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-result-review-wiring.ps1' `
  -Route 'first-live-image-provider-result-review-wiring' `
  -CommandLabel 'Go to First Live Image Provider Result Review Wiring' `
  -RouteHref '/first-live-image-provider-result-review-wiring' `
  -Phase 'Phase 3261' `
  -Title 'First Live Image Provider Result Review Wiring'
