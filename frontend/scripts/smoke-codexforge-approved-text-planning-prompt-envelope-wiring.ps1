param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3056 Approved Text Planning Prompt Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-prompt-envelope-wiring.ps1' `
  -Route 'approved-text-planning-prompt-envelope-wiring' `
  -CommandLabel 'Go to Approved Text Planning Prompt Envelope Wiring' `
  -RouteHref '/approved-text-planning-prompt-envelope-wiring' `
  -Phase '3056' `
  -Title 'Approved Text Planning Prompt Envelope Wiring'
