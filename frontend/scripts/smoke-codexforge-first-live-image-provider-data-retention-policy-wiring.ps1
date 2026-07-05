param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3270 First Live Image Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-data-retention-policy-wiring.ps1' `
  -Route 'first-live-image-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to First Live Image Provider Data Retention Policy Wiring' `
  -RouteHref '/first-live-image-provider-data-retention-policy-wiring' `
  -Phase 'Phase 3270' `
  -Title 'First Live Image Provider Data Retention Policy Wiring'
