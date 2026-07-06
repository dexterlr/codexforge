param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3426 Controlled Render Artifact Publish Worker Dispatch Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-worker-dispatch-block-wiring.ps1' -Route 'controlled-render-artifact-publish-worker-dispatch-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Worker Dispatch Block Wiring' -RouteHref '/controlled-render-artifact-publish-worker-dispatch-block-wiring' -Phase '3426' -Title 'Controlled Render Artifact Publish Worker Dispatch Block Wiring'
