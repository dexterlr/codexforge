param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3252 First Live Image Provider Cost Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-cost-cap-wiring.ps1' `
  -Route 'first-live-image-provider-cost-cap-wiring' `
  -CommandLabel 'Go to First Live Image Provider Cost Cap Wiring' `
  -RouteHref '/first-live-image-provider-cost-cap-wiring' `
  -Phase 'Phase 3252' `
  -Title 'First Live Image Provider Cost Cap Wiring'
