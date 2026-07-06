param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3408 Controlled Render Artifact Publish Account Authorization Review Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-account-authorization-review-wiring.ps1' -Route 'controlled-render-artifact-publish-account-authorization-review-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Account Authorization Review Wiring' -RouteHref '/controlled-render-artifact-publish-account-authorization-review-wiring' -Phase '3408' -Title 'Controlled Render Artifact Publish Account Authorization Review Wiring'
