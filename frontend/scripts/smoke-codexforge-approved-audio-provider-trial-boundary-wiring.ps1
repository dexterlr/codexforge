param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3114 Approved Audio Provider Trial Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-trial-boundary-wiring.ps1' `
  -Route 'approved-audio-provider-trial-boundary-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Trial Boundary Wiring' `
  -RouteHref '/approved-audio-provider-trial-boundary-wiring' `
  -Phase '3114' `
  -Title 'Approved Audio Provider Trial Boundary Wiring'
