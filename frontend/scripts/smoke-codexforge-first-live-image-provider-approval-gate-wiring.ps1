param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3244 First Live Image Provider Approval Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-approval-gate-wiring.ps1' `
  -Route 'first-live-image-provider-approval-gate-wiring' `
  -CommandLabel 'Go to First Live Image Provider Approval Gate Wiring' `
  -RouteHref '/first-live-image-provider-approval-gate-wiring' `
  -Phase 'Phase 3244' `
  -Title 'First Live Image Provider Approval Gate Wiring'
