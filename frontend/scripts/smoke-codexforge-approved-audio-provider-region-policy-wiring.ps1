param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3140 Approved Audio Provider Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-region-policy-wiring.ps1' `
  -Route 'approved-audio-provider-region-policy-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Region Policy Wiring' `
  -RouteHref '/approved-audio-provider-region-policy-wiring' `
  -Phase '3140' `
  -Title 'Approved Audio Provider Region Policy Wiring'
