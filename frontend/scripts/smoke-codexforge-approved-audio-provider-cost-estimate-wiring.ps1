param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3137 Approved Audio Provider Cost Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-cost-estimate-wiring.ps1' `
  -Route 'approved-audio-provider-cost-estimate-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Cost Estimate Wiring' `
  -RouteHref '/approved-audio-provider-cost-estimate-wiring' `
  -Phase '3137' `
  -Title 'Approved Audio Provider Cost Estimate Wiring'
