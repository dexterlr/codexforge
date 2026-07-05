param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3262 First Live Image Provider Asset Handoff Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-asset-handoff-review-wiring.ps1' `
  -Route 'first-live-image-provider-asset-handoff-review-wiring' `
  -CommandLabel 'Go to First Live Image Provider Asset Handoff Review Wiring' `
  -RouteHref '/first-live-image-provider-asset-handoff-review-wiring' `
  -Phase 'Phase 3262' `
  -Title 'First Live Image Provider Asset Handoff Review Wiring'
