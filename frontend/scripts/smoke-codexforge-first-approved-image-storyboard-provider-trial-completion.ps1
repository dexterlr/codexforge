param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3113 First Approved Image Storyboard Provider Trial Completion' `
  -ScriptFile 'smoke-codexforge-first-approved-image-storyboard-provider-trial-completion.ps1' `
  -Route 'first-approved-image-storyboard-provider-trial-completion' `
  -CommandLabel 'Go to First Approved Image Storyboard Provider Trial Completion' `
  -RouteHref '/first-approved-image-storyboard-provider-trial-completion' `
  -Phase '3113' `
  -Title 'First Approved Image Storyboard Provider Trial Completion'
