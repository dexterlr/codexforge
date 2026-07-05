param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3050 Approved Text Planning Trial Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-trial-boundary-wiring.ps1' `
  -Route 'approved-text-planning-trial-boundary-wiring' `
  -CommandLabel 'Go to Approved Text Planning Trial Boundary Wiring' `
  -RouteHref '/approved-text-planning-trial-boundary-wiring' `
  -Phase '3050' `
  -Title 'Approved Text Planning Trial Boundary Wiring'
