param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3411 Controlled Render Artifact Publish Thumbnail Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-thumbnail-policy-wiring.ps1' -Route 'controlled-render-artifact-publish-thumbnail-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Thumbnail Policy Wiring' -RouteHref '/controlled-render-artifact-publish-thumbnail-policy-wiring' -Phase '3411' -Title 'Controlled Render Artifact Publish Thumbnail Policy Wiring'
