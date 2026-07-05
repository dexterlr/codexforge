param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3071 Approved Text Planning Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-observability-trace-wiring.ps1' `
  -Route 'approved-text-planning-observability-trace-wiring' `
  -CommandLabel 'Go to Approved Text Planning Observability Trace Wiring' `
  -RouteHref '/approved-text-planning-observability-trace-wiring' `
  -Phase '3071' `
  -Title 'Approved Text Planning Observability Trace Wiring'
