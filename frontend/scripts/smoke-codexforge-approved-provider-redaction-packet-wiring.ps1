param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2967 Approved Provider Redaction Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-redaction-packet-wiring.ps1' `
  -Route 'approved-provider-redaction-packet-wiring' `
  -CommandLabel 'Go to Approved Provider Redaction Packet Wiring' `
  -RouteHref '/approved-provider-redaction-packet-wiring' `
  -Phase '2967' `
  -Title 'Approved Provider Redaction Packet Wiring'
