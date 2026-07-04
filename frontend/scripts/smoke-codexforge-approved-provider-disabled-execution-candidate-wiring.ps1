param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2984 Approved Provider Disabled Execution Candidate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-disabled-execution-candidate-wiring.ps1' `
  -Route 'approved-provider-disabled-execution-candidate-wiring' `
  -CommandLabel 'Go to Approved Provider Disabled Execution Candidate Wiring' `
  -RouteHref '/approved-provider-disabled-execution-candidate-wiring' `
  -Phase '2984' `
  -Title 'Approved Provider Disabled Execution Candidate Wiring'
