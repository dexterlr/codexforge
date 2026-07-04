param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2974 Approved Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-data-retention-policy-wiring.ps1' `
  -Route 'approved-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Data Retention Policy Wiring' `
  -RouteHref '/approved-provider-data-retention-policy-wiring' `
  -Phase '2974' `
  -Title 'Approved Provider Data Retention Policy Wiring'
