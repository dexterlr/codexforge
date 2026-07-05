param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3119 Approved Audio Provider Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-token-reference-wiring.ps1' `
  -Route 'approved-audio-provider-token-reference-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Token Reference Wiring' `
  -RouteHref '/approved-audio-provider-token-reference-wiring' `
  -Phase '3119' `
  -Title 'Approved Audio Provider Token Reference Wiring'
