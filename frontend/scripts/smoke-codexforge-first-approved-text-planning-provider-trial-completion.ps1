param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3081 First Approved Text Planning Provider Trial Completion' `
  -ScriptFile 'smoke-codexforge-first-approved-text-planning-provider-trial-completion.ps1' `
  -Route 'first-approved-text-planning-provider-trial-completion' `
  -CommandLabel 'Go to First Approved Text Planning Provider Trial Completion' `
  -RouteHref '/first-approved-text-planning-provider-trial-completion' `
  -Phase '3081' `
  -Title 'First Approved Text Planning Provider Trial Completion'
