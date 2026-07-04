param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2971 Approved Provider Privacy Guard Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-privacy-guard-wiring.ps1' `
  -Route 'approved-provider-privacy-guard-wiring' `
  -CommandLabel 'Go to Approved Provider Privacy Guard Wiring' `
  -RouteHref '/approved-provider-privacy-guard-wiring' `
  -Phase '2971' `
  -Title 'Approved Provider Privacy Guard Wiring'
