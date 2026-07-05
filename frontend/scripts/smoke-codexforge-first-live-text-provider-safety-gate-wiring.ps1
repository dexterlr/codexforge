param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3191 First Live Text Provider Safety Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-safety-gate-wiring.ps1' `
  -Route 'first-live-text-provider-safety-gate-wiring' `
  -CommandLabel 'Go to First Live Text Provider Safety Gate Wiring' `
  -RouteHref '/first-live-text-provider-safety-gate-wiring' `
  -Phase 'Phase 3191' `
  -Title 'First Live Text Provider Safety Gate Wiring'