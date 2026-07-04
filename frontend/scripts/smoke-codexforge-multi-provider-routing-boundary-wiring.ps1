param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2986 Multi-Provider Routing Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-routing-boundary-wiring.ps1' `
  -Route 'multi-provider-routing-boundary-wiring' `
  -CommandLabel 'Go to Multi-Provider Routing Boundary Wiring' `
  -RouteHref '/multi-provider-routing-boundary-wiring' `
  -Phase '2986' `
  -Title 'Multi-Provider Routing Boundary Wiring'
