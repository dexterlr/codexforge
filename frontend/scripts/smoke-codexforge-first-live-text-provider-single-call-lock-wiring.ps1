param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3198 First Live Text Provider Single Call Lock Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-single-call-lock-wiring.ps1' `
  -Route 'first-live-text-provider-single-call-lock-wiring' `
  -CommandLabel 'Go to First Live Text Provider Single Call Lock Wiring' `
  -RouteHref '/first-live-text-provider-single-call-lock-wiring' `
  -Phase 'Phase 3198' `
  -Title 'First Live Text Provider Single Call Lock Wiring'