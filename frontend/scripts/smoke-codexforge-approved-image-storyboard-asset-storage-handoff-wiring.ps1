param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3110 Approved Image Storyboard Asset Storage Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-asset-storage-handoff-wiring.ps1' `
  -Route 'approved-image-storyboard-asset-storage-handoff-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Asset Storage Handoff Wiring' `
  -RouteHref '/approved-image-storyboard-asset-storage-handoff-wiring' `
  -Phase '3110' `
  -Title 'Approved Image Storyboard Asset Storage Handoff Wiring'
