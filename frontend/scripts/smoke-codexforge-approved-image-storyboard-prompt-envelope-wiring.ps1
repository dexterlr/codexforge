param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3089 Approved Image Storyboard Prompt Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-prompt-envelope-wiring.ps1' `
  -Route 'approved-image-storyboard-prompt-envelope-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Prompt Envelope Wiring' `
  -RouteHref '/approved-image-storyboard-prompt-envelope-wiring' `
  -Phase '3089' `
  -Title 'Approved Image Storyboard Prompt Envelope Wiring'
