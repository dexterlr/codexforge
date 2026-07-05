param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3092 Approved Image Storyboard Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-error-envelope-wiring.ps1' `
  -Route 'approved-image-storyboard-error-envelope-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Error Envelope Wiring' `
  -RouteHref '/approved-image-storyboard-error-envelope-wiring' `
  -Phase '3092' `
  -Title 'Approved Image Storyboard Error Envelope Wiring'
