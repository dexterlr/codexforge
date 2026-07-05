param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3059 Approved Text Planning Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-error-envelope-wiring.ps1' `
  -Route 'approved-text-planning-error-envelope-wiring' `
  -CommandLabel 'Go to Approved Text Planning Error Envelope Wiring' `
  -RouteHref '/approved-text-planning-error-envelope-wiring' `
  -Phase '3059' `
  -Title 'Approved Text Planning Error Envelope Wiring'
