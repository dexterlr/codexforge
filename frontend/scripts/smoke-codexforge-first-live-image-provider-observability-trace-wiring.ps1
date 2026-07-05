param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3259 First Live Image Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-observability-trace-wiring.ps1' `
  -Route 'first-live-image-provider-observability-trace-wiring' `
  -CommandLabel 'Go to First Live Image Provider Observability Trace Wiring' `
  -RouteHref '/first-live-image-provider-observability-trace-wiring' `
  -Phase 'Phase 3259' `
  -Title 'First Live Image Provider Observability Trace Wiring'
