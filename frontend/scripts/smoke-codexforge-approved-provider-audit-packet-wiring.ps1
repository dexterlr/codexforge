param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2966 Approved Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-audit-packet-wiring.ps1' `
  -Route 'approved-provider-audit-packet-wiring' `
  -CommandLabel 'Go to Approved Provider Audit Packet Wiring' `
  -RouteHref '/approved-provider-audit-packet-wiring' `
  -Phase '2966' `
  -Title 'Approved Provider Audit Packet Wiring'
