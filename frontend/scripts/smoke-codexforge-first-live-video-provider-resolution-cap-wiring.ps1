param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3317 First Live Video Provider Resolution Cap Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-resolution-cap-wiring.ps1' `
  -Route 'first-live-video-provider-resolution-cap-wiring' `
  -CommandLabel 'Go to First Live Video Provider Resolution Cap Wiring' `
  -RouteHref '/first-live-video-provider-resolution-cap-wiring' `
  -Phase 'Phase 3317' `
  -Title 'First Live Video Provider Resolution Cap Wiring'
