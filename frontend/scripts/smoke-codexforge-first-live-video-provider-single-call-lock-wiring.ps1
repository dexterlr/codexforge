param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3330 First Live Video Provider Single Call Lock Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-single-call-lock-wiring.ps1' `
  -Route 'first-live-video-provider-single-call-lock-wiring' `
  -CommandLabel 'Go to First Live Video Provider Single Call Lock Wiring' `
  -RouteHref '/first-live-video-provider-single-call-lock-wiring' `
  -Phase 'Phase 3330' `
  -Title 'First Live Video Provider Single Call Lock Wiring'
