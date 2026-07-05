param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3134 Approved Audio Provider Redaction Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-redaction-review-wiring.ps1' `
  -Route 'approved-audio-provider-redaction-review-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Redaction Review Wiring' `
  -RouteHref '/approved-audio-provider-redaction-review-wiring' `
  -Phase '3134' `
  -Title 'Approved Audio Provider Redaction Review Wiring'
