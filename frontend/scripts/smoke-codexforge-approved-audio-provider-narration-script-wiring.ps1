param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3122 Approved Audio Provider Narration Script Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-narration-script-wiring.ps1' `
  -Route 'approved-audio-provider-narration-script-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Narration Script Wiring' `
  -RouteHref '/approved-audio-provider-narration-script-wiring' `
  -Phase '3122' `
  -Title 'Approved Audio Provider Narration Script Wiring'
