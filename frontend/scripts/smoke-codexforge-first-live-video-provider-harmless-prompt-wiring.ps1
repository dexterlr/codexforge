param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3314 First Live Video Provider Harmless Prompt Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-harmless-prompt-wiring.ps1' `
  -Route 'first-live-video-provider-harmless-prompt-wiring' `
  -CommandLabel 'Go to First Live Video Provider Harmless Prompt Wiring' `
  -RouteHref '/first-live-video-provider-harmless-prompt-wiring' `
  -Phase 'Phase 3314' `
  -Title 'First Live Video Provider Harmless Prompt Wiring'
