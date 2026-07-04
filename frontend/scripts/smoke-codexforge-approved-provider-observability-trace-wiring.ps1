param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2968 Approved Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-observability-trace-wiring.ps1' `
  -Route 'approved-provider-observability-trace-wiring' `
  -CommandLabel 'Go to Approved Provider Observability Trace Wiring' `
  -RouteHref '/approved-provider-observability-trace-wiring' `
  -Phase '2968' `
  -Title 'Approved Provider Observability Trace Wiring'
