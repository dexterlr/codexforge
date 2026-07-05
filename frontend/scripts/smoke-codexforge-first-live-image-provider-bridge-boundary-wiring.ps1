param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3242 First Live Image Provider Bridge Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-bridge-boundary-wiring.ps1' `
  -Route 'first-live-image-provider-bridge-boundary-wiring' `
  -CommandLabel 'Go to First Live Image Provider Bridge Boundary Wiring' `
  -RouteHref '/first-live-image-provider-bridge-boundary-wiring' `
  -Phase 'Phase 3242' `
  -Title 'First Live Image Provider Bridge Boundary Wiring'
