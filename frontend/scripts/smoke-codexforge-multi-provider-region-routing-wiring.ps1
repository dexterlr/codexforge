param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3002 Multi-Provider Region Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-region-routing-wiring.ps1' `
  -Route 'multi-provider-region-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Region Routing Wiring' `
  -RouteHref '/multi-provider-region-routing-wiring' `
  -Phase '3002' `
  -Title 'Multi-Provider Region Routing Wiring'
