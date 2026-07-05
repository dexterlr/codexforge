param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3296 First Live Audio Provider Kill Switch Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-kill-switch-wiring.ps1' `
  -Route 'first-live-audio-provider-kill-switch-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Kill Switch Wiring' `
  -RouteHref '/first-live-audio-provider-kill-switch-wiring' `
  -Phase 'Phase 3296' `
  -Title 'First Live Audio Provider Kill Switch Wiring'
