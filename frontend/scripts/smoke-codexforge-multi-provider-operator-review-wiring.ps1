param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3014 Multi-Provider Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-operator-review-wiring.ps1' `
  -Route 'multi-provider-operator-review-wiring' `
  -CommandLabel 'Go to Multi-Provider Operator Review Wiring' `
  -RouteHref '/multi-provider-operator-review-wiring' `
  -Phase '3014' `
  -Title 'Multi-Provider Operator Review Wiring'
