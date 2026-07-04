param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2975 Approved Provider Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-retry-policy-wiring.ps1' `
  -Route 'approved-provider-retry-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Retry Policy Wiring' `
  -RouteHref '/approved-provider-retry-policy-wiring' `
  -Phase '2975' `
  -Title 'Approved Provider Retry Policy Wiring'
