param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2969 Approved Provider Cost Guard Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-cost-guard-wiring.ps1' `
  -Route 'approved-provider-cost-guard-wiring' `
  -CommandLabel 'Go to Approved Provider Cost Guard Wiring' `
  -RouteHref '/approved-provider-cost-guard-wiring' `
  -Phase '2969' `
  -Title 'Approved Provider Cost Guard Wiring'
