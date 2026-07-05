param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3138 Approved Audio Provider Rate Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-rate-estimate-wiring.ps1' `
  -Route 'approved-audio-provider-rate-estimate-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Rate Estimate Wiring' `
  -RouteHref '/approved-audio-provider-rate-estimate-wiring' `
  -Phase '3138' `
  -Title 'Approved Audio Provider Rate Estimate Wiring'
