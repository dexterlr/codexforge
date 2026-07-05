param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3271 First Live Image Provider Backend Runtime Check Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-backend-runtime-check-wiring.ps1' `
  -Route 'first-live-image-provider-backend-runtime-check-wiring' `
  -CommandLabel 'Go to First Live Image Provider Backend Runtime Check Wiring' `
  -RouteHref '/first-live-image-provider-backend-runtime-check-wiring' `
  -Phase 'Phase 3271' `
  -Title 'First Live Image Provider Backend Runtime Check Wiring'
