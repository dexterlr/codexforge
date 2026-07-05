param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-text-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3193 First Live Text Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-text-provider-audit-packet-wiring.ps1' `
  -Route 'first-live-text-provider-audit-packet-wiring' `
  -CommandLabel 'Go to First Live Text Provider Audit Packet Wiring' `
  -RouteHref '/first-live-text-provider-audit-packet-wiring' `
  -Phase 'Phase 3193' `
  -Title 'First Live Text Provider Audit Packet Wiring'