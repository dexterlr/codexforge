param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3120 Approved Audio Provider Brief Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-brief-wiring.ps1' `
  -Route 'approved-audio-provider-brief-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Brief Wiring' `
  -RouteHref '/approved-audio-provider-brief-wiring' `
  -Phase '3120' `
  -Title 'Approved Audio Provider Brief Wiring'
