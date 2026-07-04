param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2959 Approved Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-request-envelope-wiring.ps1' `
  -Route 'approved-provider-request-envelope-wiring' `
  -CommandLabel 'Go to Approved Provider Request Envelope Wiring' `
  -RouteHref '/approved-provider-request-envelope-wiring' `
  -Phase '2959' `
  -Title 'Approved Provider Request Envelope Wiring'
