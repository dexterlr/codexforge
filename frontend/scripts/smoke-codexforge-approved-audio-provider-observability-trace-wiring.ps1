param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3136 Approved Audio Provider Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-observability-trace-wiring.ps1' `
  -Route 'approved-audio-provider-observability-trace-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Observability Trace Wiring' `
  -RouteHref '/approved-audio-provider-observability-trace-wiring' `
  -Phase '3136' `
  -Title 'Approved Audio Provider Observability Trace Wiring'
