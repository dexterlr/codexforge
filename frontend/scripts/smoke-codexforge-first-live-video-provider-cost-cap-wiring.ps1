param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3318 First Live Video Provider Cost Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-cost-cap-wiring.ps1' `
  -Route 'first-live-video-provider-cost-cap-wiring' `
  -CommandLabel 'Go to First Live Video Provider Cost Cap Wiring' `
  -RouteHref '/first-live-video-provider-cost-cap-wiring' `
  -Phase 'Phase 3318' `
  -Title 'First Live Video Provider Cost Cap Wiring'
