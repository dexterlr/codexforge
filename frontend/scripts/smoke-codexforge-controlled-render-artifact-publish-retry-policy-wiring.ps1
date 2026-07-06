param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3429 Controlled Render Artifact Publish Retry Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-retry-policy-wiring.ps1' -Route 'controlled-render-artifact-publish-retry-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Retry Policy Wiring' -RouteHref '/controlled-render-artifact-publish-retry-policy-wiring' -Phase '3429' -Title 'Controlled Render Artifact Publish Retry Policy Wiring'
