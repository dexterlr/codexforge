param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3181 First Live Text Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-credential-reference-wiring.ps1' `
  -Route 'first-live-text-provider-credential-reference-wiring' `
  -CommandLabel 'Go to First Live Text Provider Credential Reference Wiring' `
  -RouteHref '/first-live-text-provider-credential-reference-wiring' `
  -Phase 'Phase 3181' `
  -Title 'First Live Text Provider Credential Reference Wiring'