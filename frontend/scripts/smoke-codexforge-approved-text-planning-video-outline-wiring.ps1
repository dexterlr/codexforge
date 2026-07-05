param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3063 Approved Text Planning Video Outline Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-video-outline-wiring.ps1' `
  -Route 'approved-text-planning-video-outline-wiring' `
  -CommandLabel 'Go to Approved Text Planning Video Outline Wiring' `
  -RouteHref '/approved-text-planning-video-outline-wiring' `
  -Phase '3063' `
  -Title 'Approved Text Planning Video Outline Wiring'
