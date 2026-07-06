param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3421 Controlled Render Artifact Publish Account Auth Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-account-auth-block-wiring.ps1' -Route 'controlled-render-artifact-publish-account-auth-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Account Auth Block Wiring' -RouteHref '/controlled-render-artifact-publish-account-auth-block-wiring' -Phase '3421' -Title 'Controlled Render Artifact Publish Account Auth Block Wiring'
