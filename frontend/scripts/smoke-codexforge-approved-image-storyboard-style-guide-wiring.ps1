param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3097 Approved Image Storyboard Style Guide Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-style-guide-wiring.ps1' `
  -Route 'approved-image-storyboard-style-guide-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Style Guide Wiring' `
  -RouteHref '/approved-image-storyboard-style-guide-wiring' `
  -Phase '3097' `
  -Title 'Approved Image Storyboard Style Guide Wiring'
