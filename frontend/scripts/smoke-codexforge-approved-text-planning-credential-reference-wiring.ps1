param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3054 Approved Text Planning Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-credential-reference-wiring.ps1' `
  -Route 'approved-text-planning-credential-reference-wiring' `
  -CommandLabel 'Go to Approved Text Planning Credential Reference Wiring' `
  -RouteHref '/approved-text-planning-credential-reference-wiring' `
  -Phase '3054' `
  -Title 'Approved Text Planning Credential Reference Wiring'
