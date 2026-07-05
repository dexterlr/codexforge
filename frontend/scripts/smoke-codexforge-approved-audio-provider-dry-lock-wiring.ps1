param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3128 Approved Audio Provider Dry Lock Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-dry-lock-wiring.ps1' `
  -Route 'approved-audio-provider-dry-lock-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Dry Lock Wiring' `
  -RouteHref '/approved-audio-provider-dry-lock-wiring' `
  -Phase '3128' `
  -Title 'Approved Audio Provider Dry Lock Wiring'
