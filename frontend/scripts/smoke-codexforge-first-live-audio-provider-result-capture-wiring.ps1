param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3293 First Live Audio Provider Result Capture Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-result-capture-wiring.ps1' `
  -Route 'first-live-audio-provider-result-capture-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Result Capture Wiring' `
  -RouteHref '/first-live-audio-provider-result-capture-wiring' `
  -Phase 'Phase 3293' `
  -Title 'First Live Audio Provider Result Capture Wiring'
