param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3094 Approved Image Storyboard Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-execution-block-wiring.ps1' `
  -Route 'approved-image-storyboard-execution-block-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Execution Block Wiring' `
  -RouteHref '/approved-image-storyboard-execution-block-wiring' `
  -Phase '3094' `
  -Title 'Approved Image Storyboard Execution Block Wiring'
