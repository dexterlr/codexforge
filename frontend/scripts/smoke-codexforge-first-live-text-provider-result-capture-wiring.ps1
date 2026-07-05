param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3195 First Live Text Provider Result Capture Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-result-capture-wiring.ps1' `
  -Route 'first-live-text-provider-result-capture-wiring' `
  -CommandLabel 'Go to First Live Text Provider Result Capture Wiring' `
  -RouteHref '/first-live-text-provider-result-capture-wiring' `
  -Phase 'Phase 3195' `
  -Title 'First Live Text Provider Result Capture Wiring'