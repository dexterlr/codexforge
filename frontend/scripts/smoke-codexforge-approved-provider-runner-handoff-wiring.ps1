param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2980 Approved Provider Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-runner-handoff-wiring.ps1' `
  -Route 'approved-provider-runner-handoff-wiring' `
  -CommandLabel 'Go to Approved Provider Runner Handoff Wiring' `
  -RouteHref '/approved-provider-runner-handoff-wiring' `
  -Phase '2980' `
  -Title 'Approved Provider Runner Handoff Wiring'
