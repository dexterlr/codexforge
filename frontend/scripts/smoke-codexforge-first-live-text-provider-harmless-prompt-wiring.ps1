param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3186 First Live Text Provider Harmless Prompt Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-harmless-prompt-wiring.ps1' `
  -Route 'first-live-text-provider-harmless-prompt-wiring' `
  -CommandLabel 'Go to First Live Text Provider Harmless Prompt Wiring' `
  -RouteHref '/first-live-text-provider-harmless-prompt-wiring' `
  -Phase 'Phase 3186' `
  -Title 'First Live Text Provider Harmless Prompt Wiring'