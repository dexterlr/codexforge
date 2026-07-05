param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3064 Approved Text Planning Prompt Plan Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-prompt-plan-wiring.ps1' `
  -Route 'approved-text-planning-prompt-plan-wiring' `
  -CommandLabel 'Go to Approved Text Planning Prompt Plan Wiring' `
  -RouteHref '/approved-text-planning-prompt-plan-wiring' `
  -Phase '3064' `
  -Title 'Approved Text Planning Prompt Plan Wiring'
