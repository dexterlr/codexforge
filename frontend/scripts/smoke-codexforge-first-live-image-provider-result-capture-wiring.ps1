param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3260 First Live Image Provider Result Capture Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-result-capture-wiring.ps1' `
  -Route 'first-live-image-provider-result-capture-wiring' `
  -CommandLabel 'Go to First Live Image Provider Result Capture Wiring' `
  -RouteHref '/first-live-image-provider-result-capture-wiring' `
  -Phase 'Phase 3260' `
  -Title 'First Live Image Provider Result Capture Wiring'
