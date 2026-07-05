param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3074 Approved Text Planning Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-privacy-gate-wiring.ps1' `
  -Route 'approved-text-planning-privacy-gate-wiring' `
  -CommandLabel 'Go to Approved Text Planning Privacy Gate Wiring' `
  -RouteHref '/approved-text-planning-privacy-gate-wiring' `
  -Phase '3074' `
  -Title 'Approved Text Planning Privacy Gate Wiring'
