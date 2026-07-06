param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3428 Controlled Render Artifact Publish Replay Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-replay-block-wiring.ps1' -Route 'controlled-render-artifact-publish-replay-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Replay Block Wiring' -RouteHref '/controlled-render-artifact-publish-replay-block-wiring' -Phase '3428' -Title 'Controlled Render Artifact Publish Replay Block Wiring'
