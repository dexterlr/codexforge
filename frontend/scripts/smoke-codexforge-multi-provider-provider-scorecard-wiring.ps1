param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2998 Multi-Provider Provider Scorecard Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-provider-scorecard-wiring.ps1' `
  -Route 'multi-provider-provider-scorecard-wiring' `
  -CommandLabel 'Go to Multi-Provider Provider Scorecard Wiring' `
  -RouteHref '/multi-provider-provider-scorecard-wiring' `
  -Phase '2998' `
  -Title 'Multi-Provider Provider Scorecard Wiring'
