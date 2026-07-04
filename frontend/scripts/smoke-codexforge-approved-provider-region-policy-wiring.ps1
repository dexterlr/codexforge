param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2973 Approved Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-region-policy-wiring.ps1' `
  -Route 'approved-provider-region-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Region Policy Wiring' `
  -RouteHref '/approved-provider-region-policy-wiring' `
  -Phase '2973' `
  -Title 'Approved Provider Region Policy Wiring'
