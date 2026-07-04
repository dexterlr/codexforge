param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2982 Approved Provider Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-operator-review-wiring.ps1' `
  -Route 'approved-provider-operator-review-wiring' `
  -CommandLabel 'Go to Approved Provider Operator Review Wiring' `
  -RouteHref '/approved-provider-operator-review-wiring' `
  -Phase '2982' `
  -Title 'Approved Provider Operator Review Wiring'
