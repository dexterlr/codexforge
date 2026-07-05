param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-first-live-audio-provider-call-backend-bridge-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstLiveAudioProviderCallBackendBridgeBatchSmoke `
  -SmokeName 'Phase 3291 First Live Audio Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-live-audio-provider-audit-packet-wiring.ps1' `
  -Route 'first-live-audio-provider-audit-packet-wiring' `
  -CommandLabel 'Go to First Live Audio Provider Audit Packet Wiring' `
  -RouteHref '/first-live-audio-provider-audit-packet-wiring' `
  -Phase 'Phase 3291' `
  -Title 'First Live Audio Provider Audit Packet Wiring'
