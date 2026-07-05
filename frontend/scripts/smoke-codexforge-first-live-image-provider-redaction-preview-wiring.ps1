param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3257 First Live Image Provider Redaction Preview Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-redaction-preview-wiring.ps1' `
  -Route 'first-live-image-provider-redaction-preview-wiring' `
  -CommandLabel 'Go to First Live Image Provider Redaction Preview Wiring' `
  -RouteHref '/first-live-image-provider-redaction-preview-wiring' `
  -Phase 'Phase 3257' `
  -Title 'First Live Image Provider Redaction Preview Wiring'
