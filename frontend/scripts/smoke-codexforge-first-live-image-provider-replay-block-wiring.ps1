param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3266 First Live Image Provider Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-replay-block-wiring.ps1' `
  -Route 'first-live-image-provider-replay-block-wiring' `
  -CommandLabel 'Go to First Live Image Provider Replay Block Wiring' `
  -RouteHref '/first-live-image-provider-replay-block-wiring' `
  -Phase 'Phase 3266' `
  -Title 'First Live Image Provider Replay Block Wiring'
