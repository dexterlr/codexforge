param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3402 Controlled Render Artifact Publish Boundary Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-boundary-wiring.ps1' -Route 'controlled-render-artifact-publish-boundary-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Boundary Wiring' -RouteHref '/controlled-render-artifact-publish-boundary-wiring' -Phase '3402' -Title 'Controlled Render Artifact Publish Boundary Wiring'
