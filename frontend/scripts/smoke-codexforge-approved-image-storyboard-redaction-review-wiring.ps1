param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3100 Approved Image Storyboard Redaction Review Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-redaction-review-wiring.ps1' `
  -Route 'approved-image-storyboard-redaction-review-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Redaction Review Wiring' `
  -RouteHref '/approved-image-storyboard-redaction-review-wiring' `
  -Phase '3100' `
  -Title 'Approved Image Storyboard Redaction Review Wiring'
