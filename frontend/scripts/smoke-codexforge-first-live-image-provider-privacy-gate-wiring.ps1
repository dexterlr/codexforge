param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3255 First Live Image Provider Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-privacy-gate-wiring.ps1' `
  -Route 'first-live-image-provider-privacy-gate-wiring' `
  -CommandLabel 'Go to First Live Image Provider Privacy Gate Wiring' `
  -RouteHref '/first-live-image-provider-privacy-gate-wiring' `
  -Phase 'Phase 3255' `
  -Title 'First Live Image Provider Privacy Gate Wiring'
