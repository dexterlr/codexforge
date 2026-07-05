param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3096 Approved Image Storyboard Keyframe Candidate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-keyframe-candidate-wiring.ps1' `
  -Route 'approved-image-storyboard-keyframe-candidate-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Keyframe Candidate Wiring' `
  -RouteHref '/approved-image-storyboard-keyframe-candidate-wiring' `
  -Phase '3096' `
  -Title 'Approved Image Storyboard Keyframe Candidate Wiring'
