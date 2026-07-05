param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3285 First Live Audio Provider Cost Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-cost-cap-wiring.ps1' `
  -Route 'first-live-audio-provider-cost-cap-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Cost Cap Wiring' `
  -RouteHref '/first-live-audio-provider-cost-cap-wiring' `
  -Phase 'Phase 3285' `
  -Title 'First Live Audio Provider Cost Cap Wiring'
