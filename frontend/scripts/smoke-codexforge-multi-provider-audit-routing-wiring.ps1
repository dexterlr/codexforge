param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3005 Multi-Provider Audit Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-audit-routing-wiring.ps1' `
  -Route 'multi-provider-audit-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Audit Routing Wiring' `
  -RouteHref '/multi-provider-audit-routing-wiring' `
  -Phase '3005' `
  -Title 'Multi-Provider Audit Routing Wiring'
