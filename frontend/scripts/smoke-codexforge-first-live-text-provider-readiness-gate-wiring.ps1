param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3208 First Live Text Provider Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-readiness-gate-wiring.ps1' `
  -Route 'first-live-text-provider-readiness-gate-wiring' `
  -CommandLabel 'Go to First Live Text Provider Readiness Gate Wiring' `
  -RouteHref '/first-live-text-provider-readiness-gate-wiring' `
  -Phase 'Phase 3208' `
  -Title 'First Live Text Provider Readiness Gate Wiring'