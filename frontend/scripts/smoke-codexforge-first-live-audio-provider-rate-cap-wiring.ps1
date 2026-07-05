param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3286 First Live Audio Provider Rate Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-rate-cap-wiring.ps1' `
  -Route 'first-live-audio-provider-rate-cap-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Rate Cap Wiring' `
  -RouteHref '/first-live-audio-provider-rate-cap-wiring' `
  -Phase 'Phase 3286' `
  -Title 'First Live Audio Provider Rate Cap Wiring'
