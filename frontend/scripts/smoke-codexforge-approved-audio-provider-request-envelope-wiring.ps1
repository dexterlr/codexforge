param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3125 Approved Audio Provider Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-request-envelope-wiring.ps1' `
  -Route 'approved-audio-provider-request-envelope-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Request Envelope Wiring' `
  -RouteHref '/approved-audio-provider-request-envelope-wiring' `
  -Phase '3125' `
  -Title 'Approved Audio Provider Request Envelope Wiring'
