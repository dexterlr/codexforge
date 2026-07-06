param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3419 Controlled Render Artifact Publish Result Review Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-result-review-wiring.ps1' -Route 'controlled-render-artifact-publish-result-review-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Result Review Wiring' -RouteHref '/controlled-render-artifact-publish-result-review-wiring' -Phase '3419' -Title 'Controlled Render Artifact Publish Result Review Wiring'
