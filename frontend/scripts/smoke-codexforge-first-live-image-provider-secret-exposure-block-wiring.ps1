param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3246 First Live Image Provider Secret Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-secret-exposure-block-wiring.ps1' `
  -Route 'first-live-image-provider-secret-exposure-block-wiring' `
  -CommandLabel 'Go to First Live Image Provider Secret Exposure Block Wiring' `
  -RouteHref '/first-live-image-provider-secret-exposure-block-wiring' `
  -Phase 'Phase 3246' `
  -Title 'First Live Image Provider Secret Exposure Block Wiring'
