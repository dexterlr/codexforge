param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3066 Approved Text Planning Metadata Plan Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-metadata-plan-wiring.ps1' `
  -Route 'approved-text-planning-metadata-plan-wiring' `
  -CommandLabel 'Go to Approved Text Planning Metadata Plan Wiring' `
  -RouteHref '/approved-text-planning-metadata-plan-wiring' `
  -Phase '3066' `
  -Title 'Approved Text Planning Metadata Plan Wiring'
