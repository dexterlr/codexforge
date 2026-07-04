param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2983 Approved Provider Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-readiness-gate-wiring.ps1' `
  -Route 'approved-provider-readiness-gate-wiring' `
  -CommandLabel 'Go to Approved Provider Readiness Gate Wiring' `
  -RouteHref '/approved-provider-readiness-gate-wiring' `
  -Phase '2983' `
  -Title 'Approved Provider Readiness Gate Wiring'
