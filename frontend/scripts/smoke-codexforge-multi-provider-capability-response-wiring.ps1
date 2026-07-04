param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2989 Multi-Provider Capability Response Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-capability-response-wiring.ps1' `
  -Route 'multi-provider-capability-response-wiring' `
  -CommandLabel 'Go to Multi-Provider Capability Response Wiring' `
  -RouteHref '/multi-provider-capability-response-wiring' `
  -Phase '2989' `
  -Title 'Multi-Provider Capability Response Wiring'
