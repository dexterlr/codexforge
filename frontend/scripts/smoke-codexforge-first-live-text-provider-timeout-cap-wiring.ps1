param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3189 First Live Text Provider Timeout Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-timeout-cap-wiring.ps1' `
  -Route 'first-live-text-provider-timeout-cap-wiring' `
  -CommandLabel 'Go to First Live Text Provider Timeout Cap Wiring' `
  -RouteHref '/first-live-text-provider-timeout-cap-wiring' `
  -Phase 'Phase 3189' `
  -Title 'First Live Text Provider Timeout Cap Wiring'