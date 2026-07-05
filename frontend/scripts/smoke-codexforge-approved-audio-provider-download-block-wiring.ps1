param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3132 Approved Audio Provider Download Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-download-block-wiring.ps1' `
  -Route 'approved-audio-provider-download-block-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Download Block Wiring' `
  -RouteHref '/approved-audio-provider-download-block-wiring' `
  -Phase '3132' `
  -Title 'Approved Audio Provider Download Block Wiring'
