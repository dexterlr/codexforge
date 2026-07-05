param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3142 Approved Audio Provider Retry Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-retry-fallback-policy-wiring.ps1' `
  -Route 'approved-audio-provider-retry-fallback-policy-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Retry Fallback Policy Wiring' `
  -RouteHref '/approved-audio-provider-retry-fallback-policy-wiring' `
  -Phase '3142' `
  -Title 'Approved Audio Provider Retry Fallback Policy Wiring'
