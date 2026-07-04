param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2961 Approved Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-error-envelope-wiring.ps1' `
  -Route 'approved-provider-error-envelope-wiring' `
  -CommandLabel 'Go to Approved Provider Error Envelope Wiring' `
  -RouteHref '/approved-provider-error-envelope-wiring' `
  -Phase '2961' `
  -Title 'Approved Provider Error Envelope Wiring'
