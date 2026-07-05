param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3118 Approved Audio Provider Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-credential-reference-wiring.ps1' `
  -Route 'approved-audio-provider-credential-reference-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Credential Reference Wiring' `
  -RouteHref '/approved-audio-provider-credential-reference-wiring' `
  -Phase '3118' `
  -Title 'Approved Audio Provider Credential Reference Wiring'
