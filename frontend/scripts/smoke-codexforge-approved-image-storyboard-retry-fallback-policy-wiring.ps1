param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3108 Approved Image Storyboard Retry Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-retry-fallback-policy-wiring.ps1' `
  -Route 'approved-image-storyboard-retry-fallback-policy-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Retry Fallback Policy Wiring' `
  -RouteHref '/approved-image-storyboard-retry-fallback-policy-wiring' `
  -Phase '3108' `
  -Title 'Approved Image Storyboard Retry Fallback Policy Wiring'
