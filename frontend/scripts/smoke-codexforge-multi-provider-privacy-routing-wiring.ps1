param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3001 Multi-Provider Privacy Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-privacy-routing-wiring.ps1' `
  -Route 'multi-provider-privacy-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Privacy Routing Wiring' `
  -RouteHref '/multi-provider-privacy-routing-wiring' `
  -Phase '3001' `
  -Title 'Multi-Provider Privacy Routing Wiring'
