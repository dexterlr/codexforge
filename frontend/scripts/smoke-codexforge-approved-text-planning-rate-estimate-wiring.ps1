param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3073 Approved Text Planning Rate Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-rate-estimate-wiring.ps1' `
  -Route 'approved-text-planning-rate-estimate-wiring' `
  -CommandLabel 'Go to Approved Text Planning Rate Estimate Wiring' `
  -RouteHref '/approved-text-planning-rate-estimate-wiring' `
  -Phase '3073' `
  -Title 'Approved Text Planning Rate Estimate Wiring'
