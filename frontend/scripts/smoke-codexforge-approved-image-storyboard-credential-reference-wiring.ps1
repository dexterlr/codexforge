param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3086 Approved Image Storyboard Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-credential-reference-wiring.ps1' `
  -Route 'approved-image-storyboard-credential-reference-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Credential Reference Wiring' `
  -RouteHref '/approved-image-storyboard-credential-reference-wiring' `
  -Phase '3086' `
  -Title 'Approved Image Storyboard Credential Reference Wiring'
