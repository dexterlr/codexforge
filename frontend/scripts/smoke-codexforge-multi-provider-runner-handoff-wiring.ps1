param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 3012 Multi-Provider Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-runner-handoff-wiring.ps1' `
  -Route 'multi-provider-runner-handoff-wiring' `
  -CommandLabel 'Go to Multi-Provider Runner Handoff Wiring' `
  -RouteHref '/multi-provider-runner-handoff-wiring' `
  -Phase '3012' `
  -Title 'Multi-Provider Runner Handoff Wiring'
