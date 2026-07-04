param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3013 Multi-Provider Execution Bridge Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-execution-bridge-handoff-wiring.ps1' `
  -Route 'multi-provider-execution-bridge-handoff-wiring' `
  -CommandLabel 'Go to Multi-Provider Execution Bridge Handoff Wiring' `
  -RouteHref '/multi-provider-execution-bridge-handoff-wiring' `
  -Phase '3013' `
  -Title 'Multi-Provider Execution Bridge Handoff Wiring'
