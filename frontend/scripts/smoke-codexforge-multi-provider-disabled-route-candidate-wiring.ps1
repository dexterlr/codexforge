param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3011 Multi-Provider Disabled Route Candidate Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-disabled-route-candidate-wiring.ps1' `
  -Route 'multi-provider-disabled-route-candidate-wiring' `
  -CommandLabel 'Go to Multi-Provider Disabled Route Candidate Wiring' `
  -RouteHref '/multi-provider-disabled-route-candidate-wiring' `
  -Phase '3011' `
  -Title 'Multi-Provider Disabled Route Candidate Wiring'
