param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3133 Approved Audio Provider Safety Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-safety-review-wiring.ps1' `
  -Route 'approved-audio-provider-safety-review-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Safety Review Wiring' `
  -RouteHref '/approved-audio-provider-safety-review-wiring' `
  -Phase '3133' `
  -Title 'Approved Audio Provider Safety Review Wiring'
