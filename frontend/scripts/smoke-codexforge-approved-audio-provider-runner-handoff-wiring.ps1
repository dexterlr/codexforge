param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3144 Approved Audio Provider Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-runner-handoff-wiring.ps1' `
  -Route 'approved-audio-provider-runner-handoff-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Runner Handoff Wiring' `
  -RouteHref '/approved-audio-provider-runner-handoff-wiring' `
  -Phase '3144' `
  -Title 'Approved Audio Provider Runner Handoff Wiring'
