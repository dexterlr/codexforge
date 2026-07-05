param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3299 First Live Audio Provider Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-replay-block-wiring.ps1' `
  -Route 'first-live-audio-provider-replay-block-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Replay Block Wiring' `
  -RouteHref '/first-live-audio-provider-replay-block-wiring' `
  -Phase 'Phase 3299' `
  -Title 'First Live Audio Provider Replay Block Wiring'
