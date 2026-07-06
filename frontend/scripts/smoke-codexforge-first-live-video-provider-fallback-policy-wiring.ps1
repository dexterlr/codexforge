param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3334 First Live Video Provider Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-fallback-policy-wiring.ps1' `
  -Route 'first-live-video-provider-fallback-policy-wiring' `
  -CommandLabel 'Go to First Live Video Provider Fallback Policy Wiring' `
  -RouteHref '/first-live-video-provider-fallback-policy-wiring' `
  -Phase 'Phase 3334' `
  -Title 'First Live Video Provider Fallback Policy Wiring'
