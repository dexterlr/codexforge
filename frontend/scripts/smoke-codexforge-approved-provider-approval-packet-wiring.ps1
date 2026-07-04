param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2956 Approved Provider Approval Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-approval-packet-wiring.ps1' `
  -Route 'approved-provider-approval-packet-wiring' `
  -CommandLabel 'Go to Approved Provider Approval Packet Wiring' `
  -RouteHref '/approved-provider-approval-packet-wiring' `
  -Phase '2956' `
  -Title 'Approved Provider Approval Packet Wiring'
