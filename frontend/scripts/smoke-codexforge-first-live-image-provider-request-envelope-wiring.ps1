param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3247 First Live Image Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-request-envelope-wiring.ps1' `
  -Route 'first-live-image-provider-request-envelope-wiring' `
  -CommandLabel 'Go to First Live Image Provider Request Envelope Wiring' `
  -RouteHref '/first-live-image-provider-request-envelope-wiring' `
  -Phase 'Phase 3247' `
  -Title 'First Live Image Provider Request Envelope Wiring'
