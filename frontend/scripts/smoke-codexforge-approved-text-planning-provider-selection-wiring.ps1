param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3053 Approved Text Planning Provider Selection Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-provider-selection-wiring.ps1' `
  -Route 'approved-text-planning-provider-selection-wiring' `
  -CommandLabel 'Go to Approved Text Planning Provider Selection Wiring' `
  -RouteHref '/approved-text-planning-provider-selection-wiring' `
  -Phase '3053' `
  -Title 'Approved Text Planning Provider Selection Wiring'
