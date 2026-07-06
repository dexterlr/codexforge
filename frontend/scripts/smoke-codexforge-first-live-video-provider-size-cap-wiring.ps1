param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3316 First Live Video Provider Size Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-size-cap-wiring.ps1' `
  -Route 'first-live-video-provider-size-cap-wiring' `
  -CommandLabel 'Go to First Live Video Provider Size Cap Wiring' `
  -RouteHref '/first-live-video-provider-size-cap-wiring' `
  -Phase 'Phase 3316' `
  -Title 'First Live Video Provider Size Cap Wiring'
