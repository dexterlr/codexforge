param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3083 Approved Image Storyboard Intent Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-intent-wiring.ps1' `
  -Route 'approved-image-storyboard-intent-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Intent Wiring' `
  -RouteHref '/approved-image-storyboard-intent-wiring' `
  -Phase '3083' `
  -Title 'Approved Image Storyboard Intent Wiring'
