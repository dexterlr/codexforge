param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3248 First Live Image Provider Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-response-envelope-wiring.ps1' `
  -Route 'first-live-image-provider-response-envelope-wiring' `
  -CommandLabel 'Go to First Live Image Provider Response Envelope Wiring' `
  -RouteHref '/first-live-image-provider-response-envelope-wiring' `
  -Phase 'Phase 3248' `
  -Title 'First Live Image Provider Response Envelope Wiring'
