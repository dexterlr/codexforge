param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3277 First Live Audio Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-credential-reference-wiring.ps1' `
  -Route 'first-live-audio-provider-credential-reference-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Credential Reference Wiring' `
  -RouteHref '/first-live-audio-provider-credential-reference-wiring' `
  -Phase 'Phase 3277' `
  -Title 'First Live Audio Provider Credential Reference Wiring'
