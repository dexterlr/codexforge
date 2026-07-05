param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3061 Approved Text Planning Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-execution-block-wiring.ps1' `
  -Route 'approved-text-planning-execution-block-wiring' `
  -CommandLabel 'Go to Approved Text Planning Execution Block Wiring' `
  -RouteHref '/approved-text-planning-execution-block-wiring' `
  -Phase '3061' `
  -Title 'Approved Text Planning Execution Block Wiring'
