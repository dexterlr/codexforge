param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3072 Approved Text Planning Cost Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-cost-estimate-wiring.ps1' `
  -Route 'approved-text-planning-cost-estimate-wiring' `
  -CommandLabel 'Go to Approved Text Planning Cost Estimate Wiring' `
  -RouteHref '/approved-text-planning-cost-estimate-wiring' `
  -Phase '3072' `
  -Title 'Approved Text Planning Cost Estimate Wiring'
