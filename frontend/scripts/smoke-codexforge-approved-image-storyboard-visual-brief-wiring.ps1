param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3088 Approved Image Storyboard Visual Brief Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-visual-brief-wiring.ps1' `
  -Route 'approved-image-storyboard-visual-brief-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Visual Brief Wiring' `
  -RouteHref '/approved-image-storyboard-visual-brief-wiring' `
  -Phase '3088' `
  -Title 'Approved Image Storyboard Visual Brief Wiring'
