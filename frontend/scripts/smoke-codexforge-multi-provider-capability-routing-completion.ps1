param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3017 Multi-Provider Capability Routing Completion' `
  -ScriptFile 'smoke-codexforge-multi-provider-capability-routing-completion.ps1' `
  -Route 'multi-provider-capability-routing-completion' `
  -CommandLabel 'Go to Multi-Provider Capability Routing Completion' `
  -RouteHref '/multi-provider-capability-routing-completion' `
  -Phase '3017' `
  -Title 'Multi-Provider Capability Routing Completion'
