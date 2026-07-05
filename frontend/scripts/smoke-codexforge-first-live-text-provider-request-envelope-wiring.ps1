param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3183 First Live Text Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-request-envelope-wiring.ps1' `
  -Route 'first-live-text-provider-request-envelope-wiring' `
  -CommandLabel 'Go to First Live Text Provider Request Envelope Wiring' `
  -RouteHref '/first-live-text-provider-request-envelope-wiring' `
  -Phase 'Phase 3183' `
  -Title 'First Live Text Provider Request Envelope Wiring'