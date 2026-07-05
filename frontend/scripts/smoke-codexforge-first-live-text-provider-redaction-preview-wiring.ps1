param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3192 First Live Text Provider Redaction Preview Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-redaction-preview-wiring.ps1' `
  -Route 'first-live-text-provider-redaction-preview-wiring' `
  -CommandLabel 'Go to First Live Text Provider Redaction Preview Wiring' `
  -RouteHref '/first-live-text-provider-redaction-preview-wiring' `
  -Phase 'Phase 3192' `
  -Title 'First Live Text Provider Redaction Preview Wiring'