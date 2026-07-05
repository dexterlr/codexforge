param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3294 First Live Audio Provider Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-result-review-wiring.ps1' `
  -Route 'first-live-audio-provider-result-review-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Result Review Wiring' `
  -RouteHref '/first-live-audio-provider-result-review-wiring' `
  -Phase 'Phase 3294' `
  -Title 'First Live Audio Provider Result Review Wiring'
