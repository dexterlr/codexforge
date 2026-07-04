param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2991 Multi-Provider Image Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-image-routing-wiring.ps1' `
  -Route 'multi-provider-image-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Image Routing Wiring' `
  -RouteHref '/multi-provider-image-routing-wiring' `
  -Phase '2991' `
  -Title 'Multi-Provider Image Routing Wiring'
