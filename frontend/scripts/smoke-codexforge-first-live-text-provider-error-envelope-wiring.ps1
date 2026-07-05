param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3185 First Live Text Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-error-envelope-wiring.ps1' `
  -Route 'first-live-text-provider-error-envelope-wiring' `
  -CommandLabel 'Go to First Live Text Provider Error Envelope Wiring' `
  -RouteHref '/first-live-text-provider-error-envelope-wiring' `
  -Phase 'Phase 3185' `
  -Title 'First Live Text Provider Error Envelope Wiring'