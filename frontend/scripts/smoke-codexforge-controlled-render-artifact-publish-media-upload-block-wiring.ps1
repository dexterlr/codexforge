param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3420 Controlled Render Artifact Publish Media Upload Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-media-upload-block-wiring.ps1' -Route 'controlled-render-artifact-publish-media-upload-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Media Upload Block Wiring' -RouteHref '/controlled-render-artifact-publish-media-upload-block-wiring' -Phase '3420' -Title 'Controlled Render Artifact Publish Media Upload Block Wiring'
