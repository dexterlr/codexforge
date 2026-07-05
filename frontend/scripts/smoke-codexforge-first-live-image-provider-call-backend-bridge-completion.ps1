param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3273 First Live Image Provider Call Backend Bridge Completion' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-call-backend-bridge-completion.ps1' `
  -Route 'first-live-image-provider-call-backend-bridge-completion' `
  -CommandLabel 'Go to First Live Image Provider Call Backend Bridge Completion' `
  -RouteHref '/first-live-image-provider-call-backend-bridge-completion' `
  -Phase 'Phase 3273' `
  -Title 'First Live Image Provider Call Backend Bridge Completion'
