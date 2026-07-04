param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2997 Multi-Provider Safety Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-safety-routing-wiring.ps1' `
  -Route 'multi-provider-safety-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Safety Routing Wiring' `
  -RouteHref '/multi-provider-safety-routing-wiring' `
  -Phase '2997' `
  -Title 'Multi-Provider Safety Routing Wiring'
