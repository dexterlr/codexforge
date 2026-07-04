param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2978 Approved Provider Timeout Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-timeout-policy-wiring.ps1' `
  -Route 'approved-provider-timeout-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Timeout Policy Wiring' `
  -RouteHref '/approved-provider-timeout-policy-wiring' `
  -Phase '2978' `
  -Title 'Approved Provider Timeout Policy Wiring'
