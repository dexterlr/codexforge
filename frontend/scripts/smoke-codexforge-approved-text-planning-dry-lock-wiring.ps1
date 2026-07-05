param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3060 Approved Text Planning Dry Lock Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-dry-lock-wiring.ps1' `
  -Route 'approved-text-planning-dry-lock-wiring' `
  -CommandLabel 'Go to Approved Text Planning Dry Lock Wiring' `
  -RouteHref '/approved-text-planning-dry-lock-wiring' `
  -Phase '3060' `
  -Title 'Approved Text Planning Dry Lock Wiring'
