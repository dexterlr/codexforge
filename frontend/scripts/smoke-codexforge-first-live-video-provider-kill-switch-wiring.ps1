param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3329 First Live Video Provider Kill Switch Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-kill-switch-wiring.ps1' `
  -Route 'first-live-video-provider-kill-switch-wiring' `
  -CommandLabel 'Go to First Live Video Provider Kill Switch Wiring' `
  -RouteHref '/first-live-video-provider-kill-switch-wiring' `
  -Phase 'Phase 3329' `
  -Title 'First Live Video Provider Kill Switch Wiring'
