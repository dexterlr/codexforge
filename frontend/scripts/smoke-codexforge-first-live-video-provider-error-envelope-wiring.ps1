param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3313 First Live Video Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-error-envelope-wiring.ps1' `
  -Route 'first-live-video-provider-error-envelope-wiring' `
  -CommandLabel 'Go to First Live Video Provider Error Envelope Wiring' `
  -RouteHref '/first-live-video-provider-error-envelope-wiring' `
  -Phase 'Phase 3313' `
  -Title 'First Live Video Provider Error Envelope Wiring'
