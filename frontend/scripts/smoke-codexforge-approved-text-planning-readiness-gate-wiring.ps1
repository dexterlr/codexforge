param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3080 Approved Text Planning Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-readiness-gate-wiring.ps1' `
  -Route 'approved-text-planning-readiness-gate-wiring' `
  -CommandLabel 'Go to Approved Text Planning Readiness Gate Wiring' `
  -RouteHref '/approved-text-planning-readiness-gate-wiring' `
  -Phase '3080' `
  -Title 'Approved Text Planning Readiness Gate Wiring'
