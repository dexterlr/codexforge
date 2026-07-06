param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3422 Controlled Render Artifact Publish OAuth Flow Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-oauth-flow-block-wiring.ps1' -Route 'controlled-render-artifact-publish-oauth-flow-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish OAuth Flow Block Wiring' -RouteHref '/controlled-render-artifact-publish-oauth-flow-block-wiring' -Phase '3422' -Title 'Controlled Render Artifact Publish OAuth Flow Block Wiring'
