param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3332 First Live Video Provider Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-replay-block-wiring.ps1' `
  -Route 'first-live-video-provider-replay-block-wiring' `
  -CommandLabel 'Go to First Live Video Provider Replay Block Wiring' `
  -RouteHref '/first-live-video-provider-replay-block-wiring' `
  -Phase 'Phase 3332' `
  -Title 'First Live Video Provider Replay Block Wiring'
