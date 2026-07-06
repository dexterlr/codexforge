param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3431 Controlled Render Artifact Publish Backend Runtime Check Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-backend-runtime-check-wiring.ps1' -Route 'controlled-render-artifact-publish-backend-runtime-check-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Backend Runtime Check Wiring' -RouteHref '/controlled-render-artifact-publish-backend-runtime-check-wiring' -Phase '3431' -Title 'Controlled Render Artifact Publish Backend Runtime Check Wiring'
