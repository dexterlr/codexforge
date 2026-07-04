param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3015 Multi-Provider Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-readiness-gate-wiring.ps1' `
  -Route 'multi-provider-readiness-gate-wiring' `
  -CommandLabel 'Go to Multi-Provider Readiness Gate Wiring' `
  -RouteHref '/multi-provider-readiness-gate-wiring' `
  -Phase '3015' `
  -Title 'Multi-Provider Readiness Gate Wiring'
