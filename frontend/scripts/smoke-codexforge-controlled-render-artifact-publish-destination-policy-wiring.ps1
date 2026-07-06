param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3406 Controlled Render Artifact Publish Destination Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-destination-policy-wiring.ps1' -Route 'controlled-render-artifact-publish-destination-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Destination Policy Wiring' -RouteHref '/controlled-render-artifact-publish-destination-policy-wiring' -Phase '3406' -Title 'Controlled Render Artifact Publish Destination Policy Wiring'
