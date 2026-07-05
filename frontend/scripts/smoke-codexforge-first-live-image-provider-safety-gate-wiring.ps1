param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3256 First Live Image Provider Safety Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-safety-gate-wiring.ps1' `
  -Route 'first-live-image-provider-safety-gate-wiring' `
  -CommandLabel 'Go to First Live Image Provider Safety Gate Wiring' `
  -RouteHref '/first-live-image-provider-safety-gate-wiring' `
  -Phase 'Phase 3256' `
  -Title 'First Live Image Provider Safety Gate Wiring'
