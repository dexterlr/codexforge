param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3139 Approved Audio Provider Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-privacy-gate-wiring.ps1' `
  -Route 'approved-audio-provider-privacy-gate-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Privacy Gate Wiring' `
  -RouteHref '/approved-audio-provider-privacy-gate-wiring' `
  -Phase '3139' `
  -Title 'Approved Audio Provider Privacy Gate Wiring'
