param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3418 Controlled Render Artifact Publish Result Preview Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-result-preview-wiring.ps1' -Route 'controlled-render-artifact-publish-result-preview-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Result Preview Wiring' -RouteHref '/controlled-render-artifact-publish-result-preview-wiring' -Phase '3418' -Title 'Controlled Render Artifact Publish Result Preview Wiring'
