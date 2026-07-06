param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3311 First Live Video Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-request-envelope-wiring.ps1' `
  -Route 'first-live-video-provider-request-envelope-wiring' `
  -CommandLabel 'Go to First Live Video Provider Request Envelope Wiring' `
  -RouteHref '/first-live-video-provider-request-envelope-wiring' `
  -Phase 'Phase 3311' `
  -Title 'First Live Video Provider Request Envelope Wiring'
