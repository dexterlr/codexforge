param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3143 Approved Audio Provider Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-result-review-wiring.ps1' `
  -Route 'approved-audio-provider-result-review-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Result Review Wiring' `
  -RouteHref '/approved-audio-provider-result-review-wiring' `
  -Phase '3143' `
  -Title 'Approved Audio Provider Result Review Wiring'
