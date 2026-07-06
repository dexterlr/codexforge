param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3325 First Live Video Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-observability-trace-wiring.ps1' `
  -Route 'first-live-video-provider-observability-trace-wiring' `
  -CommandLabel 'Go to First Live Video Provider Observability Trace Wiring' `
  -RouteHref '/first-live-video-provider-observability-trace-wiring' `
  -Phase 'Phase 3325' `
  -Title 'First Live Video Provider Observability Trace Wiring'
