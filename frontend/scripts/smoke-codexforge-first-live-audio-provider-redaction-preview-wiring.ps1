param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3290 First Live Audio Provider Redaction Preview Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-redaction-preview-wiring.ps1' `
  -Route 'first-live-audio-provider-redaction-preview-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Redaction Preview Wiring' `
  -RouteHref '/first-live-audio-provider-redaction-preview-wiring' `
  -Phase 'Phase 3290' `
  -Title 'First Live Audio Provider Redaction Preview Wiring'
