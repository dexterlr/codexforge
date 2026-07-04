param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2996 Multi-Provider Metadata Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-metadata-routing-wiring.ps1' `
  -Route 'multi-provider-metadata-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Metadata Routing Wiring' `
  -RouteHref '/multi-provider-metadata-routing-wiring' `
  -Phase '2996' `
  -Title 'Multi-Provider Metadata Routing Wiring'
