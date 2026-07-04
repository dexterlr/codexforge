param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3004 Multi-Provider Approval Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-approval-routing-wiring.ps1' `
  -Route 'multi-provider-approval-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Approval Routing Wiring' `
  -RouteHref '/multi-provider-approval-routing-wiring' `
  -Phase '3004' `
  -Title 'Multi-Provider Approval Routing Wiring'
