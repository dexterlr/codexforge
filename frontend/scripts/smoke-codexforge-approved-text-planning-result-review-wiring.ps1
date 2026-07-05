param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3078 Approved Text Planning Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-result-review-wiring.ps1' `
  -Route 'approved-text-planning-result-review-wiring' `
  -CommandLabel 'Go to Approved Text Planning Result Review Wiring' `
  -RouteHref '/approved-text-planning-result-review-wiring' `
  -Phase '3078' `
  -Title 'Approved Text Planning Result Review Wiring'
