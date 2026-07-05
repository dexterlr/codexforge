param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3105 Approved Image Storyboard Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-privacy-gate-wiring.ps1' `
  -Route 'approved-image-storyboard-privacy-gate-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Privacy Gate Wiring' `
  -RouteHref '/approved-image-storyboard-privacy-gate-wiring' `
  -Phase '3105' `
  -Title 'Approved Image Storyboard Privacy Gate Wiring'
