param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3058 Approved Text Planning Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-response-envelope-wiring.ps1' `
  -Route 'approved-text-planning-response-envelope-wiring' `
  -CommandLabel 'Go to Approved Text Planning Response Envelope Wiring' `
  -RouteHref '/approved-text-planning-response-envelope-wiring' `
  -Phase '3058' `
  -Title 'Approved Text Planning Response Envelope Wiring'
