param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2992 Multi-Provider Audio Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-audio-routing-wiring.ps1' `
  -Route 'multi-provider-audio-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Audio Routing Wiring' `
  -RouteHref '/multi-provider-audio-routing-wiring' `
  -Phase '2992' `
  -Title 'Multi-Provider Audio Routing Wiring'
