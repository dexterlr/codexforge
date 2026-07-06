param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3424 Controlled Render Artifact Publish Schedule Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-schedule-block-wiring.ps1' -Route 'controlled-render-artifact-publish-schedule-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Schedule Block Wiring' -RouteHref '/controlled-render-artifact-publish-schedule-block-wiring' -Phase '3424' -Title 'Controlled Render Artifact Publish Schedule Block Wiring'
