param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3326 First Live Video Provider Result Capture Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-result-capture-wiring.ps1' `
  -Route 'first-live-video-provider-result-capture-wiring' `
  -CommandLabel 'Go to First Live Video Provider Result Capture Wiring' `
  -RouteHref '/first-live-video-provider-result-capture-wiring' `
  -Phase 'Phase 3326' `
  -Title 'First Live Video Provider Result Capture Wiring'
