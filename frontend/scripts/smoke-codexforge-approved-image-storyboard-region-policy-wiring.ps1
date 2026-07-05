param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3106 Approved Image Storyboard Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-region-policy-wiring.ps1' `
  -Route 'approved-image-storyboard-region-policy-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Region Policy Wiring' `
  -RouteHref '/approved-image-storyboard-region-policy-wiring' `
  -Phase '3106' `
  -Title 'Approved Image Storyboard Region Policy Wiring'
