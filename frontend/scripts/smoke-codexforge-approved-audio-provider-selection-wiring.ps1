param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3117 Approved Audio Provider Selection Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-selection-wiring.ps1' `
  -Route 'approved-audio-provider-selection-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Selection Wiring' `
  -RouteHref '/approved-audio-provider-selection-wiring' `
  -Phase '3117' `
  -Title 'Approved Audio Provider Selection Wiring'
