param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3102 Approved Image Storyboard Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-observability-trace-wiring.ps1' `
  -Route 'approved-image-storyboard-observability-trace-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Observability Trace Wiring' `
  -RouteHref '/approved-image-storyboard-observability-trace-wiring' `
  -Phase '3102' `
  -Title 'Approved Image Storyboard Observability Trace Wiring'
