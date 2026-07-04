param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3008 Multi-Provider Retry Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-retry-routing-wiring.ps1' `
  -Route 'multi-provider-retry-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Retry Routing Wiring' `
  -RouteHref '/multi-provider-retry-routing-wiring' `
  -Phase '3008' `
  -Title 'Multi-Provider Retry Routing Wiring'
