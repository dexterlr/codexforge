param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2988 Multi-Provider Capability Request Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-capability-request-wiring.ps1' `
  -Route 'multi-provider-capability-request-wiring' `
  -CommandLabel 'Go to Multi-Provider Capability Request Wiring' `
  -RouteHref '/multi-provider-capability-request-wiring' `
  -Phase '2988' `
  -Title 'Multi-Provider Capability Request Wiring'
