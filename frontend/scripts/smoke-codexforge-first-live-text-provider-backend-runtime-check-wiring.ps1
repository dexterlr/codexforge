param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3205 First Live Text Provider Backend Runtime Check Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-backend-runtime-check-wiring.ps1' `
  -Route 'first-live-text-provider-backend-runtime-check-wiring' `
  -CommandLabel 'Go to First Live Text Provider Backend Runtime Check Wiring' `
  -RouteHref '/first-live-text-provider-backend-runtime-check-wiring' `
  -Phase 'Phase 3205' `
  -Title 'First Live Text Provider Backend Runtime Check Wiring'