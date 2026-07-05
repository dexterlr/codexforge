param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3201 First Live Text Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-retry-policy-wiring.ps1' `
  -Route 'first-live-text-provider-retry-policy-wiring' `
  -CommandLabel 'Go to First Live Text Provider Retry Policy Wiring' `
  -RouteHref '/first-live-text-provider-retry-policy-wiring' `
  -Phase 'Phase 3201' `
  -Title 'First Live Text Provider Retry Policy Wiring'