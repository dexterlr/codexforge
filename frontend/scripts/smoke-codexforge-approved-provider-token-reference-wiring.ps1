param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2958 Approved Provider Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-token-reference-wiring.ps1' `
  -Route 'approved-provider-token-reference-wiring' `
  -CommandLabel 'Go to Approved Provider Token Reference Wiring' `
  -RouteHref '/approved-provider-token-reference-wiring' `
  -Phase '2958' `
  -Title 'Approved Provider Token Reference Wiring'
