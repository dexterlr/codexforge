param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3243 First Live Image Provider Call Intent Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-call-intent-wiring.ps1' `
  -Route 'first-live-image-provider-call-intent-wiring' `
  -CommandLabel 'Go to First Live Image Provider Call Intent Wiring' `
  -RouteHref '/first-live-image-provider-call-intent-wiring' `
  -Phase 'Phase 3243' `
  -Title 'First Live Image Provider Call Intent Wiring'
