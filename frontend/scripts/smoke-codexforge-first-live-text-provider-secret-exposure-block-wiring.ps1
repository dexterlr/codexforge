param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3182 First Live Text Provider Secret Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-secret-exposure-block-wiring.ps1' `
  -Route 'first-live-text-provider-secret-exposure-block-wiring' `
  -CommandLabel 'Go to First Live Text Provider Secret Exposure Block Wiring' `
  -RouteHref '/first-live-text-provider-secret-exposure-block-wiring' `
  -Phase 'Phase 3182' `
  -Title 'First Live Text Provider Secret Exposure Block Wiring'