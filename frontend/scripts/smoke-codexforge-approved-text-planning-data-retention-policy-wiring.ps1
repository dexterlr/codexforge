param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3076 Approved Text Planning Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-data-retention-policy-wiring.ps1' `
  -Route 'approved-text-planning-data-retention-policy-wiring' `
  -CommandLabel 'Go to Approved Text Planning Data Retention Policy Wiring' `
  -RouteHref '/approved-text-planning-data-retention-policy-wiring' `
  -Phase '3076' `
  -Title 'Approved Text Planning Data Retention Policy Wiring'
