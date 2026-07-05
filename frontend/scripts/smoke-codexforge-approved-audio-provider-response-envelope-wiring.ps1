param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3126 Approved Audio Provider Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-response-envelope-wiring.ps1' `
  -Route 'approved-audio-provider-response-envelope-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Response Envelope Wiring' `
  -RouteHref '/approved-audio-provider-response-envelope-wiring' `
  -Phase '3126' `
  -Title 'Approved Audio Provider Response Envelope Wiring'
