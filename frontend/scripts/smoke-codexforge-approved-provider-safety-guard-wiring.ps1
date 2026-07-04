param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2972 Approved Provider Safety Guard Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-safety-guard-wiring.ps1' `
  -Route 'approved-provider-safety-guard-wiring' `
  -CommandLabel 'Go to Approved Provider Safety Guard Wiring' `
  -RouteHref '/approved-provider-safety-guard-wiring' `
  -Phase '2972' `
  -Title 'Approved Provider Safety Guard Wiring'
