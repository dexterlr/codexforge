param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3010 Multi-Provider Timeout Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-timeout-routing-wiring.ps1' `
  -Route 'multi-provider-timeout-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Timeout Routing Wiring' `
  -RouteHref '/multi-provider-timeout-routing-wiring' `
  -Phase '3010' `
  -Title 'Multi-Provider Timeout Routing Wiring'
