param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3250 First Live Image Provider Harmless Prompt Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-harmless-prompt-wiring.ps1' `
  -Route 'first-live-image-provider-harmless-prompt-wiring' `
  -CommandLabel 'Go to First Live Image Provider Harmless Prompt Wiring' `
  -RouteHref '/first-live-image-provider-harmless-prompt-wiring' `
  -Phase 'Phase 3250' `
  -Title 'First Live Image Provider Harmless Prompt Wiring'
