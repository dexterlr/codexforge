param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3087 Approved Image Storyboard Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-token-reference-wiring.ps1' `
  -Route 'approved-image-storyboard-token-reference-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Token Reference Wiring' `
  -RouteHref '/approved-image-storyboard-token-reference-wiring' `
  -Phase '3087' `
  -Title 'Approved Image Storyboard Token Reference Wiring'
