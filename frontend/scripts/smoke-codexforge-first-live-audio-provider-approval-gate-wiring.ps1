param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3276 First Live Audio Provider Approval Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-approval-gate-wiring.ps1' `
  -Route 'first-live-audio-provider-approval-gate-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Approval Gate Wiring' `
  -RouteHref '/first-live-audio-provider-approval-gate-wiring' `
  -Phase 'Phase 3276' `
  -Title 'First Live Audio Provider Approval Gate Wiring'
