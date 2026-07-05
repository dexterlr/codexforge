param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3269 First Live Image Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-region-policy-wiring.ps1' `
  -Route 'first-live-image-provider-region-policy-wiring' `
  -CommandLabel 'Go to First Live Image Provider Region Policy Wiring' `
  -RouteHref '/first-live-image-provider-region-policy-wiring' `
  -Phase 'Phase 3269' `
  -Title 'First Live Image Provider Region Policy Wiring'
