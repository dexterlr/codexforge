param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-image-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3258 First Live Image Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-image-provider-audit-packet-wiring.ps1' `
  -Route 'first-live-image-provider-audit-packet-wiring' `
  -CommandLabel 'Go to First Live Image Provider Audit Packet Wiring' `
  -RouteHref '/first-live-image-provider-audit-packet-wiring' `
  -Phase 'Phase 3258' `
  -Title 'First Live Image Provider Audit Packet Wiring'
