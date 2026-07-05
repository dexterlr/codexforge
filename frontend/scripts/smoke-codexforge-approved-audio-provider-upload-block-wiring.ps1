param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3131 Approved Audio Provider Upload Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-upload-block-wiring.ps1' `
  -Route 'approved-audio-provider-upload-block-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Upload Block Wiring' `
  -RouteHref '/approved-audio-provider-upload-block-wiring' `
  -Phase '3131' `
  -Title 'Approved Audio Provider Upload Block Wiring'
