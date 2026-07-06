param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3432 Controlled Render Artifact Publish Operator Review Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-operator-review-wiring.ps1' -Route 'controlled-render-artifact-publish-operator-review-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Operator Review Wiring' -RouteHref '/controlled-render-artifact-publish-operator-review-wiring' -Phase '3432' -Title 'Controlled Render Artifact Publish Operator Review Wiring'
