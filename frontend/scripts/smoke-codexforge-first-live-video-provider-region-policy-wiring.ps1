param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3335 First Live Video Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-region-policy-wiring.ps1' `
  -Route 'first-live-video-provider-region-policy-wiring' `
  -CommandLabel 'Go to First Live Video Provider Region Policy Wiring' `
  -RouteHref '/first-live-video-provider-region-policy-wiring' `
  -Phase 'Phase 3335' `
  -Title 'First Live Video Provider Region Policy Wiring'
