param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3202 First Live Text Provider Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-fallback-policy-wiring.ps1' `
  -Route 'first-live-text-provider-fallback-policy-wiring' `
  -CommandLabel 'Go to First Live Text Provider Fallback Policy Wiring' `
  -RouteHref '/first-live-text-provider-fallback-policy-wiring' `
  -Phase 'Phase 3202' `
  -Title 'First Live Text Provider Fallback Policy Wiring'