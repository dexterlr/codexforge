param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3129 Approved Audio Provider Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-execution-block-wiring.ps1' `
  -Route 'approved-audio-provider-execution-block-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Execution Block Wiring' `
  -RouteHref '/approved-audio-provider-execution-block-wiring' `
  -Phase '3129' `
  -Title 'Approved Audio Provider Execution Block Wiring'
