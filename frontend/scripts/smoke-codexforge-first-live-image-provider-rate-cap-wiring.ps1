param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3253 First Live Image Provider Rate Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-rate-cap-wiring.ps1' `
  -Route 'first-live-image-provider-rate-cap-wiring' `
  -CommandLabel 'Go to First Live Image Provider Rate Cap Wiring' `
  -RouteHref '/first-live-image-provider-rate-cap-wiring' `
  -Phase 'Phase 3253' `
  -Title 'First Live Image Provider Rate Cap Wiring'
