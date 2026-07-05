param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3200 First Live Text Provider Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-replay-block-wiring.ps1' `
  -Route 'first-live-text-provider-replay-block-wiring' `
  -CommandLabel 'Go to First Live Text Provider Replay Block Wiring' `
  -RouteHref '/first-live-text-provider-replay-block-wiring' `
  -Phase 'Phase 3200' `
  -Title 'First Live Text Provider Replay Block Wiring'