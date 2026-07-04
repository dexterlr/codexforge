param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2987 Multi-Provider Routing Contract Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-routing-contract-wiring.ps1' `
  -Route 'multi-provider-routing-contract-wiring' `
  -CommandLabel 'Go to Multi-Provider Routing Contract Wiring' `
  -RouteHref '/multi-provider-routing-contract-wiring' `
  -Phase '2987' `
  -Title 'Multi-Provider Routing Contract Wiring'
