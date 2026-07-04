param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3000 Multi-Provider Rate Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-rate-routing-wiring.ps1' `
  -Route 'multi-provider-rate-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Rate Routing Wiring' `
  -RouteHref '/multi-provider-rate-routing-wiring' `
  -Phase '3000' `
  -Title 'Multi-Provider Rate Routing Wiring'
