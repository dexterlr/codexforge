param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3263 First Live Image Provider Kill Switch Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-kill-switch-wiring.ps1' `
  -Route 'first-live-image-provider-kill-switch-wiring' `
  -CommandLabel 'Go to First Live Image Provider Kill Switch Wiring' `
  -RouteHref '/first-live-image-provider-kill-switch-wiring' `
  -Phase 'Phase 3263' `
  -Title 'First Live Image Provider Kill Switch Wiring'
