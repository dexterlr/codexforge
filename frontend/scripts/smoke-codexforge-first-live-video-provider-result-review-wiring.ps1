param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3327 First Live Video Provider Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-result-review-wiring.ps1' `
  -Route 'first-live-video-provider-result-review-wiring' `
  -CommandLabel 'Go to First Live Video Provider Result Review Wiring' `
  -RouteHref '/first-live-video-provider-result-review-wiring' `
  -Phase 'Phase 3327' `
  -Title 'First Live Video Provider Result Review Wiring'
