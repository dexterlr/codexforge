param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3310 First Live Video Provider Secret Exposure Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-secret-exposure-block-wiring.ps1' `
  -Route 'first-live-video-provider-secret-exposure-block-wiring' `
  -CommandLabel 'Go to First Live Video Provider Secret Exposure Block Wiring' `
  -RouteHref '/first-live-video-provider-secret-exposure-block-wiring' `
  -Phase 'Phase 3310' `
  -Title 'First Live Video Provider Secret Exposure Block Wiring'
