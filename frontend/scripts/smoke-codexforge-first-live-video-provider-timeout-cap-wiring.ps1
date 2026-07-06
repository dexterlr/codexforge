param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3320 First Live Video Provider Timeout Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-timeout-cap-wiring.ps1' `
  -Route 'first-live-video-provider-timeout-cap-wiring' `
  -CommandLabel 'Go to First Live Video Provider Timeout Cap Wiring' `
  -RouteHref '/first-live-video-provider-timeout-cap-wiring' `
  -Phase 'Phase 3320' `
  -Title 'First Live Video Provider Timeout Cap Wiring'
