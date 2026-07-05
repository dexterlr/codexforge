param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3305 First Live Audio Provider Call Backend Bridge Completion' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-call-backend-bridge-completion.ps1' `
  -Route 'first-live-audio-provider-call-backend-bridge-completion' `
  -CommandLabel 'Go to First Live Audio Provider Call Backend Bridge Completion' `
  -RouteHref '/first-live-audio-provider-call-backend-bridge-completion' `
  -Phase 'Phase 3305' `
  -Title 'First Live Audio Provider Call Backend Bridge Completion'
