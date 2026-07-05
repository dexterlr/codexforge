param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3179 First Live Text Provider Call Intent Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-call-intent-wiring.ps1' `
  -Route 'first-live-text-provider-call-intent-wiring' `
  -CommandLabel 'Go to First Live Text Provider Call Intent Wiring' `
  -RouteHref '/first-live-text-provider-call-intent-wiring' `
  -Phase 'Phase 3179' `
  -Title 'First Live Text Provider Call Intent Wiring'