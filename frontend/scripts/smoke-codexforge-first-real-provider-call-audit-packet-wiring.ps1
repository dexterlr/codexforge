param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3040 First Real Provider Call Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-audit-packet-wiring.ps1' `
  -Route 'first-real-provider-call-audit-packet-wiring' `
  -CommandLabel 'Go to First Real Provider Call Audit Packet Wiring' `
  -RouteHref '/first-real-provider-call-audit-packet-wiring' `
  -Phase '3040' `
  -Title 'First Real Provider Call Audit Packet Wiring'
