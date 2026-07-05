param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3206 First Live Text Provider Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-operator-review-wiring.ps1' `
  -Route 'first-live-text-provider-operator-review-wiring' `
  -CommandLabel 'Go to First Live Text Provider Operator Review Wiring' `
  -RouteHref '/first-live-text-provider-operator-review-wiring' `
  -Phase 'Phase 3206' `
  -Title 'First Live Text Provider Operator Review Wiring'