param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-multi-provider-capability-routing-smoke-helper.ps1')

Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke `
  -SmokeName 'Phase 2994 Multi-Provider Transcription Routing Wiring' `
  -ScriptFile 'smoke-codexforge-multi-provider-transcription-routing-wiring.ps1' `
  -Route 'multi-provider-transcription-routing-wiring' `
  -CommandLabel 'Go to Multi-Provider Transcription Routing Wiring' `
  -RouteHref '/multi-provider-transcription-routing-wiring' `
  -Phase '2994' `
  -Title 'Multi-Provider Transcription Routing Wiring'
