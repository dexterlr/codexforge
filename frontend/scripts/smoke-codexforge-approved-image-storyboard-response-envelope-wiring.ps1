param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3091 Approved Image Storyboard Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-response-envelope-wiring.ps1' `
  -Route 'approved-image-storyboard-response-envelope-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Response Envelope Wiring' `
  -RouteHref '/approved-image-storyboard-response-envelope-wiring' `
  -Phase '3091' `
  -Title 'Approved Image Storyboard Response Envelope Wiring'
