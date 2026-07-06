param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3410 Controlled Render Artifact Publish Caption Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-caption-policy-wiring.ps1' -Route 'controlled-render-artifact-publish-caption-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Caption Policy Wiring' -RouteHref '/controlled-render-artifact-publish-caption-policy-wiring' -Phase '3410' -Title 'Controlled Render Artifact Publish Caption Policy Wiring'
