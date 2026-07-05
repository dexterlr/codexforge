param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3077 Approved Text Planning Retry Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-retry-fallback-policy-wiring.ps1' `
  -Route 'approved-text-planning-retry-fallback-policy-wiring' `
  -CommandLabel 'Go to Approved Text Planning Retry Fallback Policy Wiring' `
  -RouteHref '/approved-text-planning-retry-fallback-policy-wiring' `
  -Phase '3077' `
  -Title 'Approved Text Planning Retry Fallback Policy Wiring'
