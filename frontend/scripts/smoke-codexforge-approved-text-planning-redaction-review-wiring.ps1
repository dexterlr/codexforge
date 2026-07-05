param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3069 Approved Text Planning Redaction Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-redaction-review-wiring.ps1' `
  -Route 'approved-text-planning-redaction-review-wiring' `
  -CommandLabel 'Go to Approved Text Planning Redaction Review Wiring' `
  -RouteHref '/approved-text-planning-redaction-review-wiring' `
  -Phase '3069' `
  -Title 'Approved Text Planning Redaction Review Wiring'
