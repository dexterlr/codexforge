param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3336 First Live Video Provider Backend Runtime Check Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-backend-runtime-check-wiring.ps1' `
  -Route 'first-live-video-provider-backend-runtime-check-wiring' `
  -CommandLabel 'Go to First Live Video Provider Backend Runtime Check Wiring' `
  -RouteHref '/first-live-video-provider-backend-runtime-check-wiring' `
  -Phase 'Phase 3336' `
  -Title 'First Live Video Provider Backend Runtime Check Wiring'
