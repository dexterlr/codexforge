param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3112 Approved Image Storyboard Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-readiness-gate-wiring.ps1' `
  -Route 'approved-image-storyboard-readiness-gate-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Readiness Gate Wiring' `
  -RouteHref '/approved-image-storyboard-readiness-gate-wiring' `
  -Phase '3112' `
  -Title 'Approved Image Storyboard Readiness Gate Wiring'
