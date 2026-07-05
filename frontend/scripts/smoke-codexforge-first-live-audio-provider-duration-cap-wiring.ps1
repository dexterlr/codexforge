param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3283 First Live Audio Provider Duration Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-duration-cap-wiring.ps1' `
  -Route 'first-live-audio-provider-duration-cap-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Duration Cap Wiring' `
  -RouteHref '/first-live-audio-provider-duration-cap-wiring' `
  -Phase 'Phase 3283' `
  -Title 'First Live Audio Provider Duration Cap Wiring'
