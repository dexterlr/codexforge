param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3328 First Live Video Provider Asset Handoff Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-asset-handoff-review-wiring.ps1' `
  -Route 'first-live-video-provider-asset-handoff-review-wiring' `
  -CommandLabel 'Go to First Live Video Provider Asset Handoff Review Wiring' `
  -RouteHref '/first-live-video-provider-asset-handoff-review-wiring' `
  -Phase 'Phase 3328' `
  -Title 'First Live Video Provider Asset Handoff Review Wiring'
