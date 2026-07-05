param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3292 First Live Audio Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-observability-trace-wiring.ps1' `
  -Route 'first-live-audio-provider-observability-trace-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Observability Trace Wiring' `
  -RouteHref '/first-live-audio-provider-observability-trace-wiring' `
  -Phase 'Phase 3292' `
  -Title 'First Live Audio Provider Observability Trace Wiring'
