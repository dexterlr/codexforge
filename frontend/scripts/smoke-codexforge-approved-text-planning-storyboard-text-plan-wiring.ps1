param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3065 Approved Text Planning Storyboard Text Plan Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-storyboard-text-plan-wiring.ps1' `
  -Route 'approved-text-planning-storyboard-text-plan-wiring' `
  -CommandLabel 'Go to Approved Text Planning Storyboard Text Plan Wiring' `
  -RouteHref '/approved-text-planning-storyboard-text-plan-wiring' `
  -Phase '3065' `
  -Title 'Approved Text Planning Storyboard Text Plan Wiring'
