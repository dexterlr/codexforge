param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2955 Approved Provider Execution Intent Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-execution-intent-wiring.ps1' `
  -Route 'approved-provider-execution-intent-wiring' `
  -CommandLabel 'Go to Approved Provider Execution Intent Wiring' `
  -RouteHref '/approved-provider-execution-intent-wiring' `
  -Phase '2955' `
  -Title 'Approved Provider Execution Intent Wiring'
