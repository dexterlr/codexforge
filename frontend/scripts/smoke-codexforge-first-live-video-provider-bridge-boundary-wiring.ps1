param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3306 First Live Video Provider Bridge Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-bridge-boundary-wiring.ps1' `
  -Route 'first-live-video-provider-bridge-boundary-wiring' `
  -CommandLabel 'Go to First Live Video Provider Bridge Boundary Wiring' `
  -RouteHref '/first-live-video-provider-bridge-boundary-wiring' `
  -Phase 'Phase 3306' `
  -Title 'First Live Video Provider Bridge Boundary Wiring'
