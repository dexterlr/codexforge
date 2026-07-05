param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3249 First Live Image Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-error-envelope-wiring.ps1' `
  -Route 'first-live-image-provider-error-envelope-wiring' `
  -CommandLabel 'Go to First Live Image Provider Error Envelope Wiring' `
  -RouteHref '/first-live-image-provider-error-envelope-wiring' `
  -Phase 'Phase 3249' `
  -Title 'First Live Image Provider Error Envelope Wiring'
