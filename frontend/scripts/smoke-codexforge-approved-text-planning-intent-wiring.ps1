param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3051 Approved Text Planning Intent Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-intent-wiring.ps1' `
  -Route 'approved-text-planning-intent-wiring' `
  -CommandLabel 'Go to Approved Text Planning Intent Wiring' `
  -RouteHref '/approved-text-planning-intent-wiring' `
  -Phase '3051' `
  -Title 'Approved Text Planning Intent Wiring'
