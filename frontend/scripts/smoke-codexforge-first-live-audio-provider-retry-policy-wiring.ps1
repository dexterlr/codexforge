param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3300 First Live Audio Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-retry-policy-wiring.ps1' `
  -Route 'first-live-audio-provider-retry-policy-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Retry Policy Wiring' `
  -RouteHref '/first-live-audio-provider-retry-policy-wiring' `
  -Phase 'Phase 3300' `
  -Title 'First Live Audio Provider Retry Policy Wiring'
