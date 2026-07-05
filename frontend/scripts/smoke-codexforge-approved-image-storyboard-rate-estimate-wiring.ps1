param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3104 Approved Image Storyboard Rate Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-rate-estimate-wiring.ps1' `
  -Route 'approved-image-storyboard-rate-estimate-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Rate Estimate Wiring' `
  -RouteHref '/approved-image-storyboard-rate-estimate-wiring' `
  -Phase '3104' `
  -Title 'Approved Image Storyboard Rate Estimate Wiring'
