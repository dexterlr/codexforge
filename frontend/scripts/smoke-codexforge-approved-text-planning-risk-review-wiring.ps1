param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3067 Approved Text Planning Risk Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-risk-review-wiring.ps1' `
  -Route 'approved-text-planning-risk-review-wiring' `
  -CommandLabel 'Go to Approved Text Planning Risk Review Wiring' `
  -RouteHref '/approved-text-planning-risk-review-wiring' `
  -Phase '3067' `
  -Title 'Approved Text Planning Risk Review Wiring'
