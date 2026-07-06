param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-video-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveVideoProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3324 First Live Video Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-video-provider-audit-packet-wiring.ps1' `
  -Route 'first-live-video-provider-audit-packet-wiring' `
  -CommandLabel 'Go to First Live Video Provider Audit Packet Wiring' `
  -RouteHref '/first-live-video-provider-audit-packet-wiring' `
  -Phase 'Phase 3324' `
  -Title 'First Live Video Provider Audit Packet Wiring'
