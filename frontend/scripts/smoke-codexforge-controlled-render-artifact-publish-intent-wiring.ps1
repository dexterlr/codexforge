param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3403 Controlled Render Artifact Publish Intent Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-intent-wiring.ps1' -Route 'controlled-render-artifact-publish-intent-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Intent Wiring' -RouteHref '/controlled-render-artifact-publish-intent-wiring' -Phase '3403' -Title 'Controlled Render Artifact Publish Intent Wiring'
