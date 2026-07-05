param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3297 First Live Audio Provider Single Call Lock Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-single-call-lock-wiring.ps1' `
  -Route 'first-live-audio-provider-single-call-lock-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Single Call Lock Wiring' `
  -RouteHref '/first-live-audio-provider-single-call-lock-wiring' `
  -Phase 'Phase 3297' `
  -Title 'First Live Audio Provider Single Call Lock Wiring'
