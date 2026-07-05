param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3127 Approved Audio Provider Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-error-envelope-wiring.ps1' `
  -Route 'approved-audio-provider-error-envelope-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Error Envelope Wiring' `
  -RouteHref '/approved-audio-provider-error-envelope-wiring' `
  -Phase '3127' `
  -Title 'Approved Audio Provider Error Envelope Wiring'
