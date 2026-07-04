param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3016 Multi-Provider Routing Release Candidate Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-routing-release-candidate-wiring.ps1' `
  -Route 'multi-provider-routing-release-candidate-wiring' `
  -CommandLabel 'Go to Multi-Provider Routing Release Candidate Wiring' `
  -RouteHref '/multi-provider-routing-release-candidate-wiring' `
  -Phase '3016' `
  -Title 'Multi-Provider Routing Release Candidate Wiring'
