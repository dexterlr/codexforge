param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3245 First Live Image Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-credential-reference-wiring.ps1' `
  -Route 'first-live-image-provider-credential-reference-wiring' `
  -CommandLabel 'Go to First Live Image Provider Credential Reference Wiring' `
  -RouteHref '/first-live-image-provider-credential-reference-wiring' `
  -Phase 'Phase 3245' `
  -Title 'First Live Image Provider Credential Reference Wiring'
