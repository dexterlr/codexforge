param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3075 Approved Text Planning Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-region-policy-wiring.ps1' `
  -Route 'approved-text-planning-region-policy-wiring' `
  -CommandLabel 'Go to Approved Text Planning Region Policy Wiring' `
  -RouteHref '/approved-text-planning-region-policy-wiring' `
  -Phase '3075' `
  -Title 'Approved Text Planning Region Policy Wiring'
