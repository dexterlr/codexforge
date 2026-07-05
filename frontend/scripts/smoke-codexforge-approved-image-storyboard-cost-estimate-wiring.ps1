param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3103 Approved Image Storyboard Cost Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-cost-estimate-wiring.ps1' `
  -Route 'approved-image-storyboard-cost-estimate-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Cost Estimate Wiring' `
  -RouteHref '/approved-image-storyboard-cost-estimate-wiring' `
  -Phase '3103' `
  -Title 'Approved Image Storyboard Cost Estimate Wiring'
