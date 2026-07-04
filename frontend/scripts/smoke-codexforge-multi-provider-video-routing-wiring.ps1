param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2993 Multi-Provider Video Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-video-routing-wiring.ps1' `
  -Route 'multi-provider-video-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Video Routing Wiring' `
  -RouteHref '/multi-provider-video-routing-wiring' `
  -Phase '2993' `
  -Title 'Multi-Provider Video Routing Wiring'
