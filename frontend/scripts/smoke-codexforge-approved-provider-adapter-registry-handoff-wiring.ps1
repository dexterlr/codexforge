param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2981 Approved Provider Adapter Registry Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-adapter-registry-handoff-wiring.ps1' `
  -Route 'approved-provider-adapter-registry-handoff-wiring' `
  -CommandLabel 'Go to Approved Provider Adapter Registry Handoff Wiring' `
  -RouteHref '/approved-provider-adapter-registry-handoff-wiring' `
  -Phase '2981' `
  -Title 'Approved Provider Adapter Registry Handoff Wiring'
