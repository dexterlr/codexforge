param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3082 Approved Image Storyboard Trial Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-trial-boundary-wiring.ps1' `
  -Route 'approved-image-storyboard-trial-boundary-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Trial Boundary Wiring' `
  -RouteHref '/approved-image-storyboard-trial-boundary-wiring' `
  -Phase '3082' `
  -Title 'Approved Image Storyboard Trial Boundary Wiring'
