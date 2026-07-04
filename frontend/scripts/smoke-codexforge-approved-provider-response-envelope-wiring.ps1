param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2960 Approved Provider Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-response-envelope-wiring.ps1' `
  -Route 'approved-provider-response-envelope-wiring' `
  -CommandLabel 'Go to Approved Provider Response Envelope Wiring' `
  -RouteHref '/approved-provider-response-envelope-wiring' `
  -Phase '2960' `
  -Title 'Approved Provider Response Envelope Wiring'
