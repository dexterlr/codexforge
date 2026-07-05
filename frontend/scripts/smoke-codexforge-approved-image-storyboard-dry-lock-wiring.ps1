param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3093 Approved Image Storyboard Dry Lock Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-dry-lock-wiring.ps1' `
  -Route 'approved-image-storyboard-dry-lock-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Dry Lock Wiring' `
  -RouteHref '/approved-image-storyboard-dry-lock-wiring' `
  -Phase '3093' `
  -Title 'Approved Image Storyboard Dry Lock Wiring'
