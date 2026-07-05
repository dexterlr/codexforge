param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3109 Approved Image Storyboard Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-result-review-wiring.ps1' `
  -Route 'approved-image-storyboard-result-review-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Result Review Wiring' `
  -RouteHref '/approved-image-storyboard-result-review-wiring' `
  -Phase '3109' `
  -Title 'Approved Image Storyboard Result Review Wiring'
