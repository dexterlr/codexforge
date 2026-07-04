param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3003 Multi-Provider Data Retention Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-data-retention-routing-wiring.ps1' `
  -Route 'multi-provider-data-retention-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Data Retention Routing Wiring' `
  -RouteHref '/multi-provider-data-retention-routing-wiring' `
  -Phase '3003' `
  -Title 'Multi-Provider Data Retention Routing Wiring'
