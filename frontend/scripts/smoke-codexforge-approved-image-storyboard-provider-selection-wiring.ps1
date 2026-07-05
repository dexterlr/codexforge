param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3085 Approved Image Storyboard Provider Selection Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-provider-selection-wiring.ps1' `
  -Route 'approved-image-storyboard-provider-selection-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Provider Selection Wiring' `
  -RouteHref '/approved-image-storyboard-provider-selection-wiring' `
  -Phase '3085' `
  -Title 'Approved Image Storyboard Provider Selection Wiring'
