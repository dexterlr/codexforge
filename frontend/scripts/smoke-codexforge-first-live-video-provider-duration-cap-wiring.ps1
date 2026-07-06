param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3315 First Live Video Provider Duration Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-duration-cap-wiring.ps1' `
  -Route 'first-live-video-provider-duration-cap-wiring' `
  -CommandLabel 'Go to First Live Video Provider Duration Cap Wiring' `
  -RouteHref '/first-live-video-provider-duration-cap-wiring' `
  -Phase 'Phase 3315' `
  -Title 'First Live Video Provider Duration Cap Wiring'
