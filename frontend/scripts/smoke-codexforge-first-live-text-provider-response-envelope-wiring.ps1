param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3184 First Live Text Provider Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-response-envelope-wiring.ps1' `
  -Route 'first-live-text-provider-response-envelope-wiring' `
  -CommandLabel 'Go to First Live Text Provider Response Envelope Wiring' `
  -RouteHref '/first-live-text-provider-response-envelope-wiring' `
  -Phase 'Phase 3184' `
  -Title 'First Live Text Provider Response Envelope Wiring'