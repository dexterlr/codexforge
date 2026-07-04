param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2970 Approved Provider Rate Guard Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-rate-guard-wiring.ps1' `
  -Route 'approved-provider-rate-guard-wiring' `
  -CommandLabel 'Go to Approved Provider Rate Guard Wiring' `
  -RouteHref '/approved-provider-rate-guard-wiring' `
  -Phase '2970' `
  -Title 'Approved Provider Rate Guard Wiring'
