param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2954 Approved Provider Execution Bridge Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-execution-bridge-boundary-wiring.ps1' `
  -Route 'approved-provider-execution-bridge-boundary-wiring' `
  -CommandLabel 'Go to Approved Provider Execution Bridge Boundary Wiring' `
  -RouteHref '/approved-provider-execution-bridge-boundary-wiring' `
  -Phase '2954' `
  -Title 'Approved Provider Execution Bridge Boundary Wiring'
