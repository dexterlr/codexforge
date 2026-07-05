param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3282 First Live Audio Provider Harmless Prompt Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-harmless-prompt-wiring.ps1' `
  -Route 'first-live-audio-provider-harmless-prompt-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Harmless Prompt Wiring' `
  -RouteHref '/first-live-audio-provider-harmless-prompt-wiring' `
  -Phase 'Phase 3282' `
  -Title 'First Live Audio Provider Harmless Prompt Wiring'
