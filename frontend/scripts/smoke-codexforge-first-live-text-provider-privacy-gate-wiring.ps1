param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3190 First Live Text Provider Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-privacy-gate-wiring.ps1' `
  -Route 'first-live-text-provider-privacy-gate-wiring' `
  -CommandLabel 'Go to First Live Text Provider Privacy Gate Wiring' `
  -RouteHref '/first-live-text-provider-privacy-gate-wiring' `
  -Phase 'Phase 3190' `
  -Title 'First Live Text Provider Privacy Gate Wiring'