param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3413 Controlled Render Artifact Publish Privacy Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-privacy-gate-wiring.ps1' -Route 'controlled-render-artifact-publish-privacy-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Privacy Gate Wiring' -RouteHref '/controlled-render-artifact-publish-privacy-gate-wiring' -Phase '3413' -Title 'Controlled Render Artifact Publish Privacy Gate Wiring'
