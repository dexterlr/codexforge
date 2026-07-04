param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2995 Multi-Provider Editing Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-editing-routing-wiring.ps1' `
  -Route 'multi-provider-editing-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Editing Routing Wiring' `
  -RouteHref '/multi-provider-editing-routing-wiring' `
  -Phase '2995' `
  -Title 'Multi-Provider Editing Routing Wiring'
