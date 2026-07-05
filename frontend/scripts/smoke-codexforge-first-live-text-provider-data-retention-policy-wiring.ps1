param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3204 First Live Text Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-data-retention-policy-wiring.ps1' `
  -Route 'first-live-text-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to First Live Text Provider Data Retention Policy Wiring' `
  -RouteHref '/first-live-text-provider-data-retention-policy-wiring' `
  -Phase 'Phase 3204' `
  -Title 'First Live Text Provider Data Retention Policy Wiring'