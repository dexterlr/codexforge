param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3281 First Live Audio Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-error-envelope-wiring.ps1' `
  -Route 'first-live-audio-provider-error-envelope-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Error Envelope Wiring' `
  -RouteHref '/first-live-audio-provider-error-envelope-wiring' `
  -Phase 'Phase 3281' `
  -Title 'First Live Audio Provider Error Envelope Wiring'
