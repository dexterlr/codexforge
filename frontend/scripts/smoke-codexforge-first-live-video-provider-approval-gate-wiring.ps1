param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3308 First Live Video Provider Approval Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-approval-gate-wiring.ps1' `
  -Route 'first-live-video-provider-approval-gate-wiring' `
  -CommandLabel 'Go to First Live Video Provider Approval Gate Wiring' `
  -RouteHref '/first-live-video-provider-approval-gate-wiring' `
  -Phase 'Phase 3308' `
  -Title 'First Live Video Provider Approval Gate Wiring'
