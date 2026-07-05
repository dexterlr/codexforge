param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3280 First Live Audio Provider Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-response-envelope-wiring.ps1' `
  -Route 'first-live-audio-provider-response-envelope-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Response Envelope Wiring' `
  -RouteHref '/first-live-audio-provider-response-envelope-wiring' `
  -Phase 'Phase 3280' `
  -Title 'First Live Audio Provider Response Envelope Wiring'
