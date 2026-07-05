param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3111 Approved Image Storyboard Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-runner-handoff-wiring.ps1' `
  -Route 'approved-image-storyboard-runner-handoff-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Runner Handoff Wiring' `
  -RouteHref '/approved-image-storyboard-runner-handoff-wiring' `
  -Phase '3111' `
  -Title 'Approved Image Storyboard Runner Handoff Wiring'
