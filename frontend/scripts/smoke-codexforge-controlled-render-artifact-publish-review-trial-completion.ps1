param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3433 Controlled Render Artifact Publish Review Trial Completion' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-review-trial-completion.ps1' -Route 'controlled-render-artifact-publish-review-trial-completion' -CommandLabel 'Go to Controlled Render Artifact Publish Review Trial Completion' -RouteHref '/controlled-render-artifact-publish-review-trial-completion' -Phase '3433' -Title 'Controlled Render Artifact Publish Review Trial Completion'
