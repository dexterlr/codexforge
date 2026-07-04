param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2957 Approved Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-credential-reference-wiring.ps1' `
  -Route 'approved-provider-credential-reference-wiring' `
  -CommandLabel 'Go to Approved Provider Credential Reference Wiring' `
  -RouteHref '/approved-provider-credential-reference-wiring' `
  -Phase '2957' `
  -Title 'Approved Provider Credential Reference Wiring'
