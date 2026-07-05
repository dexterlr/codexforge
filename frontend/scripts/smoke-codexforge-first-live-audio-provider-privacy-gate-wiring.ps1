param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3288 First Live Audio Provider Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-privacy-gate-wiring.ps1' `
  -Route 'first-live-audio-provider-privacy-gate-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Privacy Gate Wiring' `
  -RouteHref '/first-live-audio-provider-privacy-gate-wiring' `
  -Phase 'Phase 3288' `
  -Title 'First Live Audio Provider Privacy Gate Wiring'
