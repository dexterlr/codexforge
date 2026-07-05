param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3057 Approved Text Planning Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-request-envelope-wiring.ps1' `
  -Route 'approved-text-planning-request-envelope-wiring' `
  -CommandLabel 'Go to Approved Text Planning Request Envelope Wiring' `
  -RouteHref '/approved-text-planning-request-envelope-wiring' `
  -Phase '3057' `
  -Title 'Approved Text Planning Request Envelope Wiring'
