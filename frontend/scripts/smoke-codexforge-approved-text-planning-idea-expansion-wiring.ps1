param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3062 Approved Text Planning Idea Expansion Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-idea-expansion-wiring.ps1' `
  -Route 'approved-text-planning-idea-expansion-wiring' `
  -CommandLabel 'Go to Approved Text Planning Idea Expansion Wiring' `
  -RouteHref '/approved-text-planning-idea-expansion-wiring' `
  -Phase '3062' `
  -Title 'Approved Text Planning Idea Expansion Wiring'
