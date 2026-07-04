param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2979 Approved Provider Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-result-review-wiring.ps1' `
  -Route 'approved-provider-result-review-wiring' `
  -CommandLabel 'Go to Approved Provider Result Review Wiring' `
  -RouteHref '/approved-provider-result-review-wiring' `
  -Phase '2979' `
  -Title 'Approved Provider Result Review Wiring'
