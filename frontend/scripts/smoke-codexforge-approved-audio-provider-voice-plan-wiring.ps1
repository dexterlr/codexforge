param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3121 Approved Audio Provider Voice Plan Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-voice-plan-wiring.ps1' `
  -Route 'approved-audio-provider-voice-plan-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Voice Plan Wiring' `
  -RouteHref '/approved-audio-provider-voice-plan-wiring' `
  -Phase '3121' `
  -Title 'Approved Audio Provider Voice Plan Wiring'
