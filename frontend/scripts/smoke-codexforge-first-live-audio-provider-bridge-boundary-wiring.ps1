param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3274 First Live Audio Provider Bridge Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-bridge-boundary-wiring.ps1' `
  -Route 'first-live-audio-provider-bridge-boundary-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Bridge Boundary Wiring' `
  -RouteHref '/first-live-audio-provider-bridge-boundary-wiring' `
  -Phase 'Phase 3274' `
  -Title 'First Live Audio Provider Bridge Boundary Wiring'
