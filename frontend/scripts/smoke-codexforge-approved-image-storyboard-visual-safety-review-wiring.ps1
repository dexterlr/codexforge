param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3099 Approved Image Storyboard Visual Safety Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-visual-safety-review-wiring.ps1' `
  -Route 'approved-image-storyboard-visual-safety-review-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Visual Safety Review Wiring' `
  -RouteHref '/approved-image-storyboard-visual-safety-review-wiring' `
  -Phase '3099' `
  -Title 'Approved Image Storyboard Visual Safety Review Wiring'
