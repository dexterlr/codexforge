param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2976 Approved Provider Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-fallback-policy-wiring.ps1' `
  -Route 'approved-provider-fallback-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Fallback Policy Wiring' `
  -RouteHref '/approved-provider-fallback-policy-wiring' `
  -Phase '2976' `
  -Title 'Approved Provider Fallback Policy Wiring'
