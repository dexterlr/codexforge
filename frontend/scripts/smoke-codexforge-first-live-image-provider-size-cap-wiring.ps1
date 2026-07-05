param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3251 First Live Image Provider Size Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-size-cap-wiring.ps1' `
  -Route 'first-live-image-provider-size-cap-wiring' `
  -CommandLabel 'Go to First Live Image Provider Size Cap Wiring' `
  -RouteHref '/first-live-image-provider-size-cap-wiring' `
  -Phase 'Phase 3251' `
  -Title 'First Live Image Provider Size Cap Wiring'
