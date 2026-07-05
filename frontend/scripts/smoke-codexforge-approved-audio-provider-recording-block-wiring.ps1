param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3130 Approved Audio Provider Recording Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-recording-block-wiring.ps1' `
  -Route 'approved-audio-provider-recording-block-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Recording Block Wiring' `
  -RouteHref '/approved-audio-provider-recording-block-wiring' `
  -Phase '3130' `
  -Title 'Approved Audio Provider Recording Block Wiring'
