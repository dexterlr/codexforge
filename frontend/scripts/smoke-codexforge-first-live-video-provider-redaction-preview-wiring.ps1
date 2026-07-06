param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3323 First Live Video Provider Redaction Preview Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-redaction-preview-wiring.ps1' `
  -Route 'first-live-video-provider-redaction-preview-wiring' `
  -CommandLabel 'Go to First Live Video Provider Redaction Preview Wiring' `
  -RouteHref '/first-live-video-provider-redaction-preview-wiring' `
  -Phase 'Phase 3323' `
  -Title 'First Live Video Provider Redaction Preview Wiring'
