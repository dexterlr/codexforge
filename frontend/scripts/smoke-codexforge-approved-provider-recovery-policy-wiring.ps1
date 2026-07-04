param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2977 Approved Provider Recovery Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-recovery-policy-wiring.ps1' `
  -Route 'approved-provider-recovery-policy-wiring' `
  -CommandLabel 'Go to Approved Provider Recovery Policy Wiring' `
  -RouteHref '/approved-provider-recovery-policy-wiring' `
  -Phase '2977' `
  -Title 'Approved Provider Recovery Policy Wiring'
