param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3098 Approved Image Storyboard Shot List Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-shot-list-wiring.ps1' `
  -Route 'approved-image-storyboard-shot-list-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Shot List Wiring' `
  -RouteHref '/approved-image-storyboard-shot-list-wiring' `
  -Phase '3098' `
  -Title 'Approved Image Storyboard Shot List Wiring'
