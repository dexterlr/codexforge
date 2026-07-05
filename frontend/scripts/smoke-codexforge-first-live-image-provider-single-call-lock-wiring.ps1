param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3264 First Live Image Provider Single Call Lock Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-single-call-lock-wiring.ps1' `
  -Route 'first-live-image-provider-single-call-lock-wiring' `
  -CommandLabel 'Go to First Live Image Provider Single Call Lock Wiring' `
  -RouteHref '/first-live-image-provider-single-call-lock-wiring' `
  -Phase 'Phase 3264' `
  -Title 'First Live Image Provider Single Call Lock Wiring'
