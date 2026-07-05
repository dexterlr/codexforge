param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3107 Approved Image Storyboard Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-data-retention-policy-wiring.ps1' `
  -Route 'approved-image-storyboard-data-retention-policy-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Data Retention Policy Wiring' `
  -RouteHref '/approved-image-storyboard-data-retention-policy-wiring' `
  -Phase '3107' `
  -Title 'Approved Image Storyboard Data Retention Policy Wiring'
