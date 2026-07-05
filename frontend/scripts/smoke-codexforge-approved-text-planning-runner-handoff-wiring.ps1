param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3079 Approved Text Planning Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-runner-handoff-wiring.ps1' `
  -Route 'approved-text-planning-runner-handoff-wiring' `
  -CommandLabel 'Go to Approved Text Planning Runner Handoff Wiring' `
  -RouteHref '/approved-text-planning-runner-handoff-wiring' `
  -Phase '3079' `
  -Title 'Approved Text Planning Runner Handoff Wiring'
