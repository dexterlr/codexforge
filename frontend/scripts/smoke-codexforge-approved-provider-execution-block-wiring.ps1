param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2963 Approved Provider Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-execution-block-wiring.ps1' `
  -Route 'approved-provider-execution-block-wiring' `
  -CommandLabel 'Go to Approved Provider Execution Block Wiring' `
  -RouteHref '/approved-provider-execution-block-wiring' `
  -Phase '2963' `
  -Title 'Approved Provider Execution Block Wiring'
