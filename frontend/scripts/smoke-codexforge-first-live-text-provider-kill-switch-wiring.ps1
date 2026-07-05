param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3197 First Live Text Provider Kill Switch Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-kill-switch-wiring.ps1' `
  -Route 'first-live-text-provider-kill-switch-wiring' `
  -CommandLabel 'Go to First Live Text Provider Kill Switch Wiring' `
  -RouteHref '/first-live-text-provider-kill-switch-wiring' `
  -Phase 'Phase 3197' `
  -Title 'First Live Text Provider Kill Switch Wiring'