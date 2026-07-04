param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2999 Multi-Provider Cost Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-cost-routing-wiring.ps1' `
  -Route 'multi-provider-cost-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Cost Routing Wiring' `
  -RouteHref '/multi-provider-cost-routing-wiring' `
  -Phase '2999' `
  -Title 'Multi-Provider Cost Routing Wiring'
