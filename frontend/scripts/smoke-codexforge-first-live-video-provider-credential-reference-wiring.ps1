param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3309 First Live Video Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-credential-reference-wiring.ps1' `
  -Route 'first-live-video-provider-credential-reference-wiring' `
  -CommandLabel 'Go to First Live Video Provider Credential Reference Wiring' `
  -RouteHref '/first-live-video-provider-credential-reference-wiring' `
  -Phase 'Phase 3309' `
  -Title 'First Live Video Provider Credential Reference Wiring'
