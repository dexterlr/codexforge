param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3284 First Live Audio Provider Size Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-size-cap-wiring.ps1' `
  -Route 'first-live-audio-provider-size-cap-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Size Cap Wiring' `
  -RouteHref '/first-live-audio-provider-size-cap-wiring' `
  -Phase 'Phase 3284' `
  -Title 'First Live Audio Provider Size Cap Wiring'
