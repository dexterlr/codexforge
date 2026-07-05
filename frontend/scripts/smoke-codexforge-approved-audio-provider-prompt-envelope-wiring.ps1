param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3124 Approved Audio Provider Prompt Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-prompt-envelope-wiring.ps1' `
  -Route 'approved-audio-provider-prompt-envelope-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Prompt Envelope Wiring' `
  -RouteHref '/approved-audio-provider-prompt-envelope-wiring' `
  -Phase '3124' `
  -Title 'Approved Audio Provider Prompt Envelope Wiring'
