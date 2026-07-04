param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3006 Multi-Provider Redaction Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-redaction-routing-wiring.ps1' `
  -Route 'multi-provider-redaction-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Redaction Routing Wiring' `
  -RouteHref '/multi-provider-redaction-routing-wiring' `
  -Phase '3006' `
  -Title 'Multi-Provider Redaction Routing Wiring'
