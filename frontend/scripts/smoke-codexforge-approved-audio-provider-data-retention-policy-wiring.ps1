param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3141 Approved Audio Provider Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-data-retention-policy-wiring.ps1' `
  -Route 'approved-audio-provider-data-retention-policy-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Data Retention Policy Wiring' `
  -RouteHref '/approved-audio-provider-data-retention-policy-wiring' `
  -Phase '3141' `
  -Title 'Approved Audio Provider Data Retention Policy Wiring'
