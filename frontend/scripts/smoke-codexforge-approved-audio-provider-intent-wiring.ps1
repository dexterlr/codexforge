param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3115 Approved Audio Provider Intent Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-intent-wiring.ps1' `
  -Route 'approved-audio-provider-intent-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Intent Wiring' `
  -RouteHref '/approved-audio-provider-intent-wiring' `
  -Phase '3115' `
  -Title 'Approved Audio Provider Intent Wiring'
