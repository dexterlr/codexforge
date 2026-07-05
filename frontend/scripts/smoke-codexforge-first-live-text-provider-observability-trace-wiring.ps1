param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3194 First Live Text Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-observability-trace-wiring.ps1' `
  -Route 'first-live-text-provider-observability-trace-wiring' `
  -CommandLabel 'Go to First Live Text Provider Observability Trace Wiring' `
  -RouteHref '/first-live-text-provider-observability-trace-wiring' `
  -Phase 'Phase 3194' `
  -Title 'First Live Text Provider Observability Trace Wiring'