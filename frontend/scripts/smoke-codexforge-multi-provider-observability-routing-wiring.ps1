param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3007 Multi-Provider Observability Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-observability-routing-wiring.ps1' `
  -Route 'multi-provider-observability-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Observability Routing Wiring' `
  -RouteHref '/multi-provider-observability-routing-wiring' `
  -Phase '3007' `
  -Title 'Multi-Provider Observability Routing Wiring'
