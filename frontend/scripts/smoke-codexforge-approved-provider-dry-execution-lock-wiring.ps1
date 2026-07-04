param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2962 Approved Provider Dry Execution Lock Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-dry-execution-lock-wiring.ps1' `
  -Route 'approved-provider-dry-execution-lock-wiring' `
  -CommandLabel 'Go to Approved Provider Dry Execution Lock Wiring' `
  -RouteHref '/approved-provider-dry-execution-lock-wiring' `
  -Phase '2962' `
  -Title 'Approved Provider Dry Execution Lock Wiring'
