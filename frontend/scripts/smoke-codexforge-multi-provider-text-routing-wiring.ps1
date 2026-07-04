param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2990 Multi-Provider Text Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-text-routing-wiring.ps1' `
  -Route 'multi-provider-text-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Text Routing Wiring' `
  -RouteHref '/multi-provider-text-routing-wiring' `
  -Phase '2990' `
  -Title 'Multi-Provider Text Routing Wiring'
