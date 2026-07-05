param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3055 Approved Text Planning Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-token-reference-wiring.ps1' `
  -Route 'approved-text-planning-token-reference-wiring' `
  -CommandLabel 'Go to Approved Text Planning Token Reference Wiring' `
  -RouteHref '/approved-text-planning-token-reference-wiring' `
  -Phase '3055' `
  -Title 'Approved Text Planning Token Reference Wiring'
