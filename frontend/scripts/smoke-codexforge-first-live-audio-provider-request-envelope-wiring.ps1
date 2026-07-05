param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3279 First Live Audio Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-request-envelope-wiring.ps1' `
  -Route 'first-live-audio-provider-request-envelope-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Request Envelope Wiring' `
  -RouteHref '/first-live-audio-provider-request-envelope-wiring' `
  -Phase 'Phase 3279' `
  -Title 'First Live Audio Provider Request Envelope Wiring'
