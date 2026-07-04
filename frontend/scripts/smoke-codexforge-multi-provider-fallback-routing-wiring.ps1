param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3009 Multi-Provider Fallback Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-fallback-routing-wiring.ps1' `
  -Route 'multi-provider-fallback-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Fallback Routing Wiring' `
  -RouteHref '/multi-provider-fallback-routing-wiring' `
  -Phase '3009' `
  -Title 'Multi-Provider Fallback Routing Wiring'
