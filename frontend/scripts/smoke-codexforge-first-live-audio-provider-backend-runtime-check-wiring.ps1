param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3304 First Live Audio Provider Backend Runtime Check Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-backend-runtime-check-wiring.ps1' `
  -Route 'first-live-audio-provider-backend-runtime-check-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Backend Runtime Check Wiring' `
  -RouteHref '/first-live-audio-provider-backend-runtime-check-wiring' `
  -Phase 'Phase 3304' `
  -Title 'First Live Audio Provider Backend Runtime Check Wiring'
