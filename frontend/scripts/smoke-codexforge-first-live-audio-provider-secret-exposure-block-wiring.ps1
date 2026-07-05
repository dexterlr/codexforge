param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3278 First Live Audio Provider Secret Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-secret-exposure-block-wiring.ps1' `
  -Route 'first-live-audio-provider-secret-exposure-block-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Secret Exposure Block Wiring' `
  -RouteHref '/first-live-audio-provider-secret-exposure-block-wiring' `
  -Phase 'Phase 3278' `
  -Title 'First Live Audio Provider Secret Exposure Block Wiring'
