param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3295 First Live Audio Provider Asset Handoff Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-asset-handoff-review-wiring.ps1' `
  -Route 'first-live-audio-provider-asset-handoff-review-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Asset Handoff Review Wiring' `
  -RouteHref '/first-live-audio-provider-asset-handoff-review-wiring' `
  -Phase 'Phase 3295' `
  -Title 'First Live Audio Provider Asset Handoff Review Wiring'
