param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3203 First Live Text Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-region-policy-wiring.ps1' `
  -Route 'first-live-text-provider-region-policy-wiring' `
  -CommandLabel 'Go to First Live Text Provider Region Policy Wiring' `
  -RouteHref '/first-live-text-provider-region-policy-wiring' `
  -Phase 'Phase 3203' `
  -Title 'First Live Text Provider Region Policy Wiring'