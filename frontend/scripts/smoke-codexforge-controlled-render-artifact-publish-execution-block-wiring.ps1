param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3425 Controlled Render Artifact Publish Execution Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-execution-block-wiring.ps1' -Route 'controlled-render-artifact-publish-execution-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Execution Block Wiring' -RouteHref '/controlled-render-artifact-publish-execution-block-wiring' -Phase '3425' -Title 'Controlled Render Artifact Publish Execution Block Wiring'
