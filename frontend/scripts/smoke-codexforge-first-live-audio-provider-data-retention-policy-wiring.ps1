param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3303 First Live Audio Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-data-retention-policy-wiring.ps1' `
  -Route 'first-live-audio-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Data Retention Policy Wiring' `
  -RouteHref '/first-live-audio-provider-data-retention-policy-wiring' `
  -Phase 'Phase 3303' `
  -Title 'First Live Audio Provider Data Retention Policy Wiring'
