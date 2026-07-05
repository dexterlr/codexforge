param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3090 Approved Image Storyboard Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-request-envelope-wiring.ps1' `
  -Route 'approved-image-storyboard-request-envelope-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Request Envelope Wiring' `
  -RouteHref '/approved-image-storyboard-request-envelope-wiring' `
  -Phase '3090' `
  -Title 'Approved Image Storyboard Request Envelope Wiring'
