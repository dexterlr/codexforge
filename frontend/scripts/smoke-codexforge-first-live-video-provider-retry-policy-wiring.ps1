param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3333 First Live Video Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-retry-policy-wiring.ps1' `
  -Route 'first-live-video-provider-retry-policy-wiring' `
  -CommandLabel 'Go to First Live Video Provider Retry Policy Wiring' `
  -RouteHref '/first-live-video-provider-retry-policy-wiring' `
  -Phase 'Phase 3333' `
  -Title 'First Live Video Provider Retry Policy Wiring'
