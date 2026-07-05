param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3145 First Approved Audio Provider Trial Completion' `
  -ScriptFile 'smoke-codexforge-first-approved-audio-provider-trial-completion.ps1' `
  -Route 'first-approved-audio-provider-trial-completion' `
  -CommandLabel 'Go to First Approved Audio Provider Trial Completion' `
  -RouteHref '/first-approved-audio-provider-trial-completion' `
  -Phase '3145' `
  -Title 'First Approved Audio Provider Trial Completion'
