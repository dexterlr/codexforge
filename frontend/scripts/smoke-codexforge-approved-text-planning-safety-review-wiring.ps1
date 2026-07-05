param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3068 Approved Text Planning Safety Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-safety-review-wiring.ps1' `
  -Route 'approved-text-planning-safety-review-wiring' `
  -CommandLabel 'Go to Approved Text Planning Safety Review Wiring' `
  -RouteHref '/approved-text-planning-safety-review-wiring' `
  -Phase '3068' `
  -Title 'Approved Text Planning Safety Review Wiring'
