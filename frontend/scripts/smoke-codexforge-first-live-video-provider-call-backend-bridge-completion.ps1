param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3337 First Live Video Provider Call Backend Bridge Completion' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-call-backend-bridge-completion.ps1' `
  -Route 'first-live-video-provider-call-backend-bridge-completion' `
  -CommandLabel 'Go to First Live Video Provider Call Backend Bridge Completion' `
  -RouteHref '/first-live-video-provider-call-backend-bridge-completion' `
  -Phase 'Phase 3337' `
  -Title 'First Live Video Provider Call Backend Bridge Completion'
